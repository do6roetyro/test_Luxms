import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setDataIndex } from "../../reducers/dataSlice";
import Chart from "../Chart/Chart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Main.css";

const MainContainer = () => {
  const dispatch = useDispatch();
  const { data, currentDataIndex, loading, error } = useSelector(
    (state) => state.data
  );
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(fetchData(currentDataIndex));
  }, [dispatch, currentDataIndex]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDataChange = (index) => {
    dispatch(setDataIndex(index));
    dispatch(fetchData(index));
    handleMenuClose();
  };

  return (
    <main className="main">
      <div className="wrapper">
        <h1 className="visually-hidden">Анализ тестов различных систем</h1>
        <h2 className="main__title">
          {`Количество пройденных тестов ${data?.title}` ||
            "Загрузка данных..."}
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon className="main__more-button" />
          </IconButton>
        </h2>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {[...Array(5)].map((_, index) => (
            <MenuItem
              key={index}
              onClick={() => handleDataChange(index)}
              disabled={loading || index === currentDataIndex}
            >
              Загрузить данные {index + 1}
            </MenuItem>
          ))}
        </Menu>

        {loading && <p>Загрузка...</p>}
        {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
        {data && <Chart data={data} />}
      </div>
    </main>
  );
};

export default MainContainer;