import { Address } from 'src/user/entities/address.entity'

export class AddressDto {
  street: string
  building: number
  flat: number
  floor: number

  constructor(address: Address) {
    this.street = address.street
    this.building = address.building
    this.flat = address.flat
    this.floor = address.floor
  }
}
