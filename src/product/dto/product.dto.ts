export class CreateProductDTO {
  readonly name: string;
  readonly description: string;
  readonly imgURL: string;
  readonly price: number;
  readonly createdAt: Date;
}
