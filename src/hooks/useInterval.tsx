import { useEffect, useRef } from 'react'

type Callback = () => void

/**
 * Interval hook
 * (shamelessly copied from Dan Abramov :P)
 */
export function useInterval(callback: Callback, delay: number) {
  const savedCallback = useRef<Callback>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current!()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
