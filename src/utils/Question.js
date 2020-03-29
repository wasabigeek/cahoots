import React, { useState } from 'react'


const Question = ({ data, className }) => (
  <div className={className}>
    <h2>{data.get('Name')}</h2>
    <ol>
      <li>{data.get('Answer A')}</li>
      <li>{data.get('Answer B')}</li>
      <li>{data.get('Answer C')}</li>
      <li>{data.get('Answer D')}</li>
    </ol>
  </div>
)

export default Question
