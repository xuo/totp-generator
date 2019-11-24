import React from 'react'

/**
 * Progress bar component
 */
export const ProgressBar = ({ count, max = 100 }: Props) => (
  <div className="progress-container">
    <span
      className="progress-outer"
      style={{ width: (100 * count) / max + '%' }}
    >
      <span className="progress-inner"></span>
    </span>
  </div>
)

interface Props {
  count: number
  max?: number
}
