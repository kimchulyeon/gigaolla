import React from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

import fire from '../image/fire_gray.svg'
import fireColor from '../image/fire_color.svg'

function NavigationFiremenu({
  fixBackground,
  onClickShowFix,
  onClickSection,
  onMouseOver,
  onMouseOut,
  hoveredIcon,
  openedSection,
  onClicklnb,
  clickTextColor,
}) {
  return (
    <>
      <NavLink
        to="/소방"
        className={clsx('link fire', {
          activeBg: fixBackground === 'firemenu',
        })}
        onClick={() => {
          onClickSection('fire')
          onClickShowFix('firemenu')
        }}
        onMouseOver={() => {
          onMouseOver('firemenucolor')
        }}
        onMouseOut={() => {
          onMouseOut('firemenucolor')
        }}
      >
        <img
          src={fixBackground === 'firemenu' || hoveredIcon === 'firemenucolor' ? fireColor : fire}
          alt="menu"
          className={clsx('navicon', {
            fireicon: hoveredIcon === 'firemenucolor',
          })}
        />
        <span className="firetext">소방직</span>
      </NavLink>

      <div
        className={clsx('lnbcontainer fire', {
          hidden: openedSection !== 'fire',
        })}
      >
        <ul className="lnb">
          <li>
            <NavLink
              className={
                clsx('link fire', {
                  activeBg: fixBackground === 'firemenu',
                })
                  ? 'lnblink fontWhite'
                  : 'lnblink '
              }
              to="/소방"
            >
              <p className="clickde_text">전체</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="lnblink"
              to="/소방/1"
              onClick={() => {
                onClicklnb('Fclass1')
              }}
            >
              <p
                className={clsx('lnbtext', {
                  clickde_text: clickTextColor === 'Fclass1',
                })}
              >
                1반
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="lnblink"
              to="/소방/2"
              onClick={() => {
                onClicklnb('Fclass2')
              }}
            >
              <p
                className={clsx('lnbtext', {
                  clickde_text: clickTextColor === 'Fclass2',
                })}
              >
                2반
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="lnblink"
              to="/소방/3"
              onClick={() => {
                onClicklnb('Fclass3')
              }}
            >
              <p
                className={clsx('lnbtext', {
                  clickde_text: clickTextColor === 'Fclass3',
                })}
              >
                3반
              </p>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}

export default NavigationFiremenu
