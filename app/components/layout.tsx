import React from 'react'
import Nav from './layout/nav'
import BreadCrumbs from './breadCrumbs'

export default function Layout() {
  return (
    <div className='py-8 px-12'>
        <Nav />
        <BreadCrumbs />
    </div>
  )
}
