# psk-mobile



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type            | Default     |
| ---------------- | ----------------- | ----------- | --------------- | ----------- |
| `controllerName` | `controller-name` |             | `string`        | `undefined` |
| `disableHeader`  | `disable-header`  |             | `boolean`       | `false`     |
| `disableSidebar` | `disable-sidebar` |             | `boolean`       | `false`     |
| `enableBack`     | `enable-back`     |             | `boolean`       | `false`     |
| `history`        | --                |             | `RouterHistory` | `undefined` |
| `title`          | `title`           |             | `string`        | `''`        |


## Events

| Event                            | Description | Type               |
| -------------------------------- | ----------- | ------------------ |
| `webcardinal:config:getCoreType` |             | `CustomEvent<any>` |


## Methods

### `toggleOptions(visible: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggleSidebar(visible: any) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [psk-button](../psk-button)
- [psk-user-profile](../psk-user-profile)
- [psk-app-menu](../psk-app-menu)

### Graph
```mermaid
graph TD;
  psk-mobile --> psk-button
  psk-mobile --> psk-user-profile
  psk-mobile --> psk-app-menu
  style psk-mobile fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Made by [WebCardinal](https://github.com/webcardinal) contributors.*
