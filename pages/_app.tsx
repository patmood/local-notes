import React from 'react'
import App from 'next/app'
import localforage from 'localforage'

localforage.config({
  name: 'Notes app',
})

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp
