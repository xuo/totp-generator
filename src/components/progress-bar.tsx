import React from 'react'

export const ProgressBar = ({ count, max = 100 }: Props) => (
  <div className="progress-container">
    <span
      className="progress-child"
      style={{ width: (100 * count) / max + '%' }}
    >
      <span className="progress-child progress-bar"></span>
    </span>
  </div>
)

interface Props {
  count: number
  max?: number
}
