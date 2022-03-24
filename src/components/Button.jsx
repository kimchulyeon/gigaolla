import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "antd/dist/antd.css";
import { Menu, Dropdown, Button } from "antd";
import styled from "styled-components";
import dropdown from "../image/dropdown.svg";

const DropDownWrap = styled(Dropdown)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 101px;
  height: 40px;
  background-color: #fff;
  border: 0.5px solid #545454;
  border-radius: 5px;
  top: 110px;
  right: 31px;
  cursor: pointer;
  &:hover {
    border: 0.5px solid #545454;
  }
`;

const DropdownButton = styled(Button)`
  cursor: pointer;
`;

const Content = styled.p`
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  color: #545454;
  margin-right: 10px;
`;

const MenuBox = styled.div`
  width: 101px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04);
`;

const MenuItem = styled(Menu.Item)`
  display: flex;
  width: 101px;
  color: #545454;
  cursor: pointer;
  padding: 7px;
`;

const subjects = {
  경찰: ["경찰학", "형사법", "헌법"],
  행정: ["행정학", "국어", "한국사", "행정법", "영어"],
  소방: ["소방학개론", "소방한국사", "소방영어", "소방관계법규", "소방행정법"],
};

const Button2 = ({
  filterSubject,
  setFilterSubject,
  setFilterClass,
  filterClass,
}) => {
  const params = useParams();
  const SUBJECT = params.subject;
  const subject = subjects[SUBJECT];

  const menu = (
    <Menu>
      <MenuBox>
        {subject.map((i) => {
          let datas = (
            <MenuItem
              key={i}
              onClick={() => {
                setFilterSubject(i);
                setFilterClass(i);
              }}
            >
              {i}
            </MenuItem>
          );
          return datas;
        })}
      </MenuBox>
    </Menu>
  );
  return (
    <DropDownWrap overlay={menu}>
      <DropdownButton>
        <Content>정렬</Content>
        <img src={dropdown} alt="dropdown" />
      </DropdownButton>
    </DropDownWrap>
  );
};

export default Button2;
