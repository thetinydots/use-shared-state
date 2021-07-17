/**
 * @param key string
 * @return change state function
 */
export declare function useSharedStateChange<T = any>(key: string): (newValue: T) => void;
/**
 * @param key string
 * @param initialValue (optional) initial value
 * @return shared state value
 */
export declare function useSharedStateValue<T = any>(key: string, initialValue?: T): T;
/**
 * @param key string
 * @param initialValue (optional) initial value
 * @return shared state value and change state function
 */
declare function useSharedState<T = any>(key: string, initialValue?: T): [T, (newValue: T) => any];
export default useSharedState;
