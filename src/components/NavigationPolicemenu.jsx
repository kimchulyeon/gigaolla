import React from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

import police from '../image/police_gray.svg'
import policeColor from '../image/police_color.svg'

function NavigationPolicemenu({
  fixBackground,
  onClickShowFix,
  onClickSection,
  onMouseOver,
  onMouseOut,
  hoveredIcon,
  openedSection,
  clickTextColor,
  onClicklnb,
}) {
  return (
    <>
      <NavLink
        to="/경찰"
        className={clsx('link police', {
          activeBg: fixBackground === 'policemenu',
        })}
        onClick={() => {
          onClickSection('police')
          onClickShowFix('policemenu')
        }}
        onMouseOver={() => {
          onMouseOver('policemenucolor')
        }}
        onMouseOut={() => {
          onMouseOut('policemenucolor')
        }}
      >
        <img
          src={
            fixBackground === 'policemenu' || hoveredIcon === 'policemenucolor'
              ? policeColor
              : police
          }
          alt="menu"
          className={clsx('navicon', {
            policeicon: hoveredIcon === 'policemenucolor',
          })}
        />
        <span className="policetext">경찰직</span>
      </NavLink>

      <div
        className={clsx('lnbcontainer police', {
          hidden: openedSection !== 'police',
        })}
      >
        <ul className="lnb">
          <li>
            <NavLink
              className="lnblink"
              to="/경찰"
              onClick={() => {
                onClicklnb('Pclass0')
              }}
            >
              <p
                className={clsx('lnbtext', {
                  clickde_text: fixBackground === 'policemenu' || clickTextColor === 'Pclass0',
                })}
              >
                전체
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="lnblink"
              to="/경찰/1"
              onClick={() => {
                onClicklnb('Pclass1')
              }}
            >
              <p
                className={clsx('lnbtext', {
                  clickde_text: clickTextColor === 'Pclass1',
                })}
              >
                1반
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="lnblink"
              to="/경찰/2"
              onClick={() => {
                onClicklnb('Pclass2')
              }}
            >
              <p
                className={clsx('lnbtext', {
                  clickde_text: clickTextColor === 'Pclass2',
                })}
              >
                2반
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="lnblink"
              to="/경찰/3"
              onClick={() => {
                onClicklnb('Pclass3')
              }}
            >
              <p
                className={clsx('lnbtext', {
                  clickde_text: clickTextColor === 'Pclass3',
                })}
              >
                3반
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="lnblink"
              to="/경찰/5"
              onClick={() => {
                onClicklnb('Pclass5')
              }}
            >
              <p
                className={clsx('lnbtext', {
                  clickde_text: clickTextColor === 'Pclass5',
                })}
              >
                5반
              </p>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}

export default NavigationPolicemenu
