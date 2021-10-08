/**
 * non-hook function
 * @param key string
 * @param initialValue (optional) initial value
 * @return shared state value
 */
declare const getOrSetSharedValue: <T = any>(key: string, value?: T | undefined) => T;
/**
 * @param key string
 * @param value value
 * @return void
 */
declare function setSharedValue<T = any>(key: string, value: T): void;
/**
 * @param key string
 * @return change state function
 */
declare function useSharedStateChange<T = any>(key: string): (newValue: T) => void;
/**
 * @param key string
 * @param initialValue (optional) initial value
 * @return shared state value
 */
declare function useSharedStateValue<T = any>(key: string, initialValue?: T): T;
/**
 * @param key string
 * @param initialValue (optional) initial value
 * @return shared state value and change state function
 */
declare function useSharedState<T = any>(key: string, initialValue?: T): [T, (newValue: T) => any];

export default useSharedState;
export { getOrSetSharedValue, setSharedValue, useSharedStateChange, useSharedStateValue };
