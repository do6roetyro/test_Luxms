import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setDataIndex } from "../../reducers/dataSlice";
import Chart from "../Chart/Chart";
import "../Chart/Chart.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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
    <div>
      <h1>{data?.title || "Загрузка данных..."}</h1>

      {/* Иконка троеточия для открытия меню */}
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>

      {/* Выпадающее меню для выбора данных */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
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
  );
};

export default MainContainer;
