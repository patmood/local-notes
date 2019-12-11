import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
        <style jsx global>
          {`
            body {
              font-family: -apple-system, BlinkMacSystemFont, Avenir Next,
                Avenir, Helvetica, sans-serif;
              margin: 0;
              padding: 0;
            }
          `}
        </style>
      </Html>
    );
  }
}
