export type IOrder = 
    ITransferShipsOrder
    | ILoadMetalOrder
    | IDropMetalOrder
    | IMoveFleetOrder
    | IHookArtifactOrder
    | IUnhookArtifactOrder

export type ITransferShipsOrder = {
    type: 'TRANSFER_SHIPS',
    sourceType: 'I_SHIPS' | 'P_SHIPS' | 'FLEET',
    targetType: 'FLEET',
    sourceKey: number,
    targetKey: number,
    amount: number
} | {
    type: 'TRANSFER_SHIPS',
    sourceType: 'I_SHIPS' | 'FLEET',
    targetType: 'P_SHIPS' ,
    sourceKey: number,
    amount: number
} | {
    type: 'TRANSFER_SHIPS',
    sourceType: 'P_SHIPS' | 'FLEET',
    targetType: 'I_SHIPS' ,
    sourceKey: number,
    amount: number
}

export type ILoadMetalOrder = {
    type: 'LOAD_METAL',
    sourceKey: number,
    amountType: 'ALL'
} | {
    type: 'LOAD_METAL',
    sourceKey: number,
    amountType: 'AMOUNT',
    amount: number
}

export type IDropMetalOrder = {
    type: 'DROP_METAL',
    sourceKey: number,
    amountType: 'ALL'
} | {
    type: 'DROP_METAL',
    sourceKey: number,
    amountType: 'AMOUNT',
    amount: number
}

export type IMoveFleetOrder = {
    type: 'MOVE_FLEET',
    fleetKey: number,
    waypointKeys: [] | [number] | [number,number]
    destinationKey: number,
}

export type IHookArtifactOrder = {
    type: 'HOOK_ARTIFACT',
    fleetKey: number,
    artifactKey: number,
}

export type IUnhookArtifactOrder = {
    type: 'UNHOOK_ARTIFACT',
    artifactKey: number,
}