import { useEffect } from 'react';
import useCommittedRef from '@restart/hooks/useCommittedRef';
/**
 * Creates a `setInterval` that is properly cleaned up when a component unmounted
 *
 * @public
 * @param fn an function run on each interval
 * @param ms The milliseconds duration of the interval
 */

function useInterval(fn, ms, paused = false, runImmediately = false) {
  let handle;
  const fnRef = useCommittedRef(fn); // this ref is necessary b/c useEffect will sometimes miss a paused toggle
  // orphaning a setTimeout chain in the aether, so relying on it's refresh logic is not reliable.

  const pausedRef = useCommittedRef(paused);

  const tick = () => {
    if (pausedRef.current) return;
    fnRef.current();
    schedule(); // eslint-disable-line no-use-before-define
  };

  const schedule = () => {
    clearTimeout(handle);
    handle = setTimeout(tick, ms);
  };

  useEffect(() => {
    if (runImmediately) {
      tick();
    } else {
      schedule();
    }

    return () => clearTimeout(handle);
  }, [paused, runImmediately]);
}

export default useInterval;