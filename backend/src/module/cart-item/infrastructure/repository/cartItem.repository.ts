import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItem } from "../entity/cartItem.entity";
import { Repository } from "typeorm";
import { UserEntity } from "../../../user/infrastructure/entity/user.entity";
import { Product } from "../../../product/infrastructure/product/entity/product.entity";

@Injectable()
export class CartItemRepository {
    constructor(
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>
    ) { }
    async findOne(productId: number, userId: string) {
        return this.cartItemRepository.findOne({
            where: {
                user: { id: userId },
                product: { id: productId },
            },
            relations: {
                user: true,
                product: true
            },
        });
    }

    async findOneCartItem(cartItemId: number, userId: string) {
        return await this.cartItemRepository.findOne({
            where: {
                id: cartItemId,
                user: { id: userId },
            },
            relations: {
                product: true
            },
        })
    }
    async save(cartitem: CartItem) {
        return await this.cartItemRepository.save(cartitem)
    }

    async create(quantity: number, userId: string, product: Product) {
        return await this.cartItemRepository.create({
            quantity: quantity,
            user: { id: userId } as UserEntity,
            product,
        })
    }

    async find(userId: string) {
        return await this.cartItemRepository.find({
            where: {
                user: { id: userId },
            },
            relations: {
                product: true
            },
        })
    }

    async remove(cartItem: CartItem) {
        return await this.cartItemRepository.remove(cartItem)
    }

    async delete(userId: string) {
        return await this.cartItemRepository.delete({
            user: {
                id: userId
            }
        })
    }

}