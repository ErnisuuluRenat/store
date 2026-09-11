import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class orderItemDto {
    @IsNotEmpty()
    @IsNumber()
    orderItemId : number

    @IsNotEmpty()
    @IsNumber()
    quantity: number

    @IsNotEmpty()
    @IsNumber()
    unitPrice: number

    @IsNotEmpty()
    @IsString()
    name : string
}