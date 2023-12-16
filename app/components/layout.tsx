import React from 'react'
import Nav from './layout/nav'
import BreadCrumbs from './breadCrumbs'

export default function Layout() {
  return (
    <div className='py-8 md:px-12 px-4'>
        <Nav />
        <BreadCrumbs />
    </div>
  )
}
