import { BaseEntity, Column, Entity, Index } from "typeorm";

@Index("INDEX_CATEGORY", ["categoryId"], {})
@Index("INDEX_CATEGORY_NAME", ["categoryId", "name"], {})
@Index("INDEX_FILE_TOKEN", ["fileToken"], {})
@Index("INDEX_NAME", ["name"], {})
@Index("UK_primary_id", ["id"], { unique: true })
@Entity("product_data", { schema: "sff" })
export class ProductData extends BaseEntity {
  @Column("bigint", {
    primary: true,
    name: "id",
    comment: "记录唯一标识id",
    unsigned: true,
  })
  id: string;

  @Column("varchar", { name: "stripe_product_id", length: 500 })
  stripeProductId: string;

  @Column("varchar", { name: "stripe_price_id", length: 500 })
  stripePriceId: string;

  @Column("bigint", { name: "category_id", comment: "种类id" })
  categoryId: string;

  @Column("varchar", { name: "name", comment: "商品名称", length: 255 })
  name: string;

  @Column("decimal", {
    name: "price",
    comment: "价格",
    precision: 10,
    scale: 2,
  })
  price: string;

  @Column("varchar", { name: "file_token", length: 255 })
  fileToken: string;

  @Column("varchar", { name: "preview", length: 255 })
  preview: string;

  @Column("tinyint", {
    name: "status",
    comment: "对应记录是否可用，1可用，0不可用",
    unsigned: true,
    default: () => "'1'",
  })
  status: number;

  @Column("varchar", { name: "remark", comment: "对应记录备注", length: 500 })
  remark: string;

  @Column("int", {
    name: "version",
    comment: "对应记录的修订版本号,乐观锁",
    unsigned: true,
    default: () => "'0'",
  })
  version: number;

  @Column("datetime", {
    name: "create_time",
    comment: "对应记录的创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date;

  @Column("varchar", {
    name: "create_by",
    comment: "对应记录的创建者",
    length: 64,
  })
  createBy: string;

  @Column("datetime", {
    name: "update_time",
    comment: "对应记录的最后修改时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateTime: Date;

  @Column("varchar", {
    name: "update_by",
    comment: "对应记录的最后修改者",
    length: 64,
  })
  updateBy: string;
}
