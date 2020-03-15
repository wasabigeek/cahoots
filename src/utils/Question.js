import React, { useState } from 'react'


const Question = ({ data }) => (
  <div>
    <div>{data.get('Name')}</div>
    <ol>
      <li>{data.get('Answer A')}</li>
      <li>{data.get('Answer B')}</li>
      <li>{data.get('Answer C')}</li>
      <li>{data.get('Answer D')}</li>
    </ol>
  </div>
)

export default Question
