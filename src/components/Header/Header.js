import React from "react";
import { useLocation } from "react-router-dom";
import { PageHeader, Divider, Select } from "antd";
import { createArrayFromRange } from "../../utils";
import PropTypes from "prop-types";
import "./Header.css";

const { Option } = Select;

const Header = (props) => {
  const location = useLocation();
  const { selectedYear, setSelectedYear, currentYear } = props;
  const startYear = selectedYear - 20;

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="Header">
      <PageHeader
        title="Movies"
        className="site-page-header"
        extra={
          location.pathname === "/"
            ? [
                <Select
                  defaultValue={selectedYear}
                  style={{ width: 120 }}
                  onChange={handleYearChange}
                >
                  {createArrayFromRange(startYear, currentYear).map((year) => (
                    <Option key={year} value={year}>
                      {year}
                    </Option>
                  ))}
                </Select>,
              ]
            : []
        }
      />
      <Divider plain />
    </div>
  );
};

Header.propTypes = {
  selectedYear: PropTypes.number,
  currentYear: PropTypes.number,
  setSelectedYear: PropTypes.func,
};

Header.defaultProps = {
  selectedYear: new Date().getFullYear(),
  currentYear: new Date().getFullYear(),
  setSelectedYear: () => {
    throw new Error("Can't set selected year due to not passed setter");
  },
};

export default Header;
