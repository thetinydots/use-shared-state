## @tinyd/usesharedstate

Shared States across multiple components.

### Available hooks 🪝

1. useSharedState
2. useSharedStateValue
3. useSharedStateChange

### Available functions ⚙️

1. getOrSetSharedValue

## Usage

1. useSharedState ( Hook 🪝 )

```typescript
const [value, setValue] = useSharedState<string>(
  "key",
  "initialValue"
); //second arg is optional
```

2. useSharedStateValue ( Hook 🪝 )

```typescript
const value = useSharedStateValue<string>(
  "key",
  "initialValue"
); //second arg is optional
```

3. useSharedStateValue ( Hook 🪝 )

```typescript
const setValue =
  useSharedStateChange<string>("key");
```

4. getOrSetSharedValue ( Function ⚙️ )

```typescript
const value = getOrSetSharedValue<string>(
  "key",
  "initialValue"
); //second arg is optional
```
