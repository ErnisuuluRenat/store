import { IsNotEmpty, IsString, IsDate, IsNumber } from "class-validator"

type order_item = {
    unitPrice: number,
    name : string,
    quantity: number,
    orderItemId : number
}

export class orderDto {
    @IsNotEmpty()
    @IsNumber()
    orderId : number

    @IsNotEmpty()
    @IsNumber()
    totalPrice: number

    @IsNotEmpty()
    @IsString()
    status : string

    @IsNotEmpty()
    @IsDate()
    createdAt: Date

    @IsNotEmpty()
    items: order_item[]
}