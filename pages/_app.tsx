import React from 'react'
import App from 'next/app'
import localforage from 'localforage'

localforage.config({
  name: 'Notes app',
})

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Component {...pageProps} />
        <style jsx global>
          {`
            body {
              font-family: -apple-system, BlinkMacSystemFont, Avenir Next,
                Avenir, Helvetica, proxima-nova, sans-serif;
              margin: 0;
              padding: 0;
              color: rgb(45, 51, 74);
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              font-weight: 700;
              line-height: 1.3em;
              color: rgb(39, 35, 67);
            }

            p {
              line-height: 1.8em;
            }
          `}
        </style>
      </>
    )
  }
}

export default MyApp
