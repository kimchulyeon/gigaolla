import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import police from '../../image/police_gray.svg'
import fire from '../../image/fire_gray.svg'
import admin from '../../image/admin_gray.svg'

const StudentListHeader = ({ number }) => {
  const { subject } = useParams()
  console.log(subject)

  const IconBox = styled.div`
    width: 15em;
    height: 5em;
    margin-top: 7.5em;
    margin-left: -75em;
    display: flex;
    align-items: center;
    justify-content: space-around;

    & > a {
      height: 4em;
      width: 4em;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;

      &:nth-of-type(1) {
        background-color: ${(props) => (props.subject === '경찰' ? '#21468d' : 'white')};
      }
      &:nth-of-type(2) {
        background-color: ${(props) => (props.subject === '소방' ? '#fd4f3a' : 'white')};
      }
      &:nth-of-type(3) {
        background-color: ${(props) => (props.subject === '행정' ? '#257e0e' : 'white')};
      }
    }
  `

  return (
    <>
      {number ? (
        <IconBox subject={subject}>
          <Link to={`/경찰/${number}/students`}>
            <img src={police} alt="menu" />
          </Link>
          <Link to={`/소방/${number}/students`}>
            <img src={fire} alt="menu" />
          </Link>
          <Link to={`/행정/${number}/students`}>
            <img src={admin} alt="menu" />
          </Link>
        </IconBox>
      ) : (
        <IconBox subject={subject}>
          <Link to={`/경찰/students`}>
            <img src={police} alt="menu" />
          </Link>
          <Link to={`/소방/students`}>
            <img src={fire} alt="menu" />
          </Link>
          <Link to={`/행정/students`}>
            <img src={admin} alt="menu" />
          </Link>
        </IconBox>
      )}
    </>
  )
}

export default StudentListHeader
