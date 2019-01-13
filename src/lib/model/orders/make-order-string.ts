import { IOrder } from "./order";

export function makeOrderString(order: IOrder): string {
    switch (order.type) {
        case 'DROP_METAL':
            switch (order.amountType) {
                case 'ALL':
                    return `F${order.sourceKey}D`;
                case 'AMOUNT':
                    return `F${order.sourceKey}D${order.amount}`;
            }
        case 'LOAD_METAL':
            switch (order.amountType) {
                case 'ALL':
                    return `F${order.sourceKey}L`;
                case 'AMOUNT':
                    return `F${order.sourceKey}L${order.amount}`;
            }
        case 'TRANSFER_SHIPS':
            switch (order.sourceType) {
                case 'FLEET':
                    switch (order.targetType) {
                        case 'I_SHIPS':
                            return `F${order.sourceKey}T${order.amount}I`;
                        case 'P_SHIPS':
                            return `F${order.sourceKey}T${order.amount}P`;
                        case 'FLEET':
                            return `F${order.sourceKey}T${order.amount}F${order.targetKey}`;
                    }
                case 'I_SHIPS':
                    switch (order.targetType) {
                        case 'P_SHIPS':
                            return `I${order.sourceKey}T${order.amount}P`;
                        case 'FLEET':
                            return `I${order.sourceKey}T${order.amount}F${order.targetKey}`;
                    }
                case 'P_SHIPS':
                    switch (order.targetType) {
                        case 'I_SHIPS':
                            return `P${order.sourceKey}T${order.amount}I`;
                        case 'FLEET':
                            return `P${order.sourceKey}T${order.amount}F${order.targetKey}`;
                    }
            }
        case 'MOVE_FLEET':
            switch (order.waypointKeys.length) {
                case 0:
                    return `F${order.fleetKey}W${order.destinationKey}`;
                case 1:
                    return `F${order.fleetKey}W${order.waypointKeys[0]}W${order.destinationKey}`;
                case 2:
                    return `F${order.fleetKey}W${order.waypointKeys[0]}W${order.waypointKeys[1]}W${order.destinationKey}`;
            }
            throw "Invalid move fleet order"
        case 'HOOK_ARTIFACT':
            return `V${order.artifactKey}F${order.fleetKey}`;
        case 'UNHOOK_ARTIFACT':
            return `V${order.artifactKey}W`
    }
}