import React, { useState } from 'react'
import TimeCounter from './TimeCounter'


const Question = ({ data }) => (
  <div>
    <div>{data.get('Name')}</div>
    <ol>
      <li>{data.get('Answer A')}</li>
      <li>{data.get('Answer B')}</li>
      <li>{data.get('Answer C')}</li>
      <li>{data.get('Answer D')}</li>
    </ol>
    <TimeCounter till={new Date(data.get('Finished At'))} />
  </div>
)

export default Question
