import {
  useCallback,
  useEffect,
  useState,
} from "react";
import * as PubSub from "pubsub-js";
const valuesStore: { [key: string]: any } = {};

/**
 * non-hook function
 * @param key string
 * @param initialValue (optional) initial value
 * @return shared state value
 */
const getOrSetSharedValue = <T = any>(
  key: string,
  value?: T
) => {
  if (key in valuesStore) {
    return valuesStore[key] as T;
  }
  if (typeof value !== "undefined")
    valuesStore[key] = value;
  return value as T;
};

/**
 * @param key string
 * @return change state function
 */
export function useSharedStateChange<T = any>(
  key: string
) {
  const changeValue = useCallback(
    (newValue: T) => {
      PubSub.publish(key, newValue);
    },
    [key]
  );

  return changeValue;
}

/**
 * @param key string
 * @param initialValue (optional) initial value
 * @return shared state value
 */
export function useSharedStateValue<T = any>(
  key: string,
  initialValue?: T
): T {
  const [value, setValue] = useState<T>(
    getOrSetSharedValue(key, initialValue)
  );

  useEffect(() => {
    const id = PubSub.subscribe(
      key,
      (_: string, data: T) => {
        valuesStore[key] = data;
        setValue(data);
      }
    );
    return () => PubSub.unsubscribe(id);
  }, [key, setValue]);

  return value;
}

/**
 * @param key string
 * @param initialValue (optional) initial value
 * @return shared state value and change state function
 */
function useSharedState<T = any>(
  key: string,
  initialValue?: T
): [T, (newValue: T) => any] {
  const [value, setValue] = useState<T>(
    getOrSetSharedValue(key, initialValue)
  );

  const changeValue = useSharedStateChange(key);

  useEffect(() => {
    const id = PubSub.subscribe(
      key,
      (_: string, data: T) => {
        // console.log("got new value", key, data);
        valuesStore[key] = data;
        setValue(data);
      }
    );
    return () => PubSub.unsubscribe(id);
  }, [key, setValue]);

  return [value, changeValue];
}

export default useSharedState;
