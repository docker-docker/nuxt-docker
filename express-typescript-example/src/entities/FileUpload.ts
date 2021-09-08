import {BaseEntity, Column, Entity, Index} from "typeorm";
import idGenerator from "../utils/id-generator";

@Index("INDEX_FILE_TOKEN", ["fileToken"], {})
@Index("INDEX_URL", ["url"], {})
@Index("UK_primary_id", ["id"], {unique: true})
@Entity("file_upload", {schema: "sff"})
export class FileUpload extends BaseEntity {
    @Column("bigint", {
        primary: true,
        name: "id",
        comment: "记录唯一标识id",
        unsigned: true,
        default: 2
    })
    id: string;

    @Column("varchar", {name: "file_token", length: 255})
    fileToken: string;

    @Column("varchar", {name: "original_name", length: 255})
    originalName: string;

    @Column("varchar", {name: "file_name", length: 255})
    fileName: string;

    @Column("varchar", {name: "file_path", length: 255})
    filePath: string;

    @Column("varchar", {name: "url", length: 255})
    url: string;

    @Column("tinyint", {
        name: "status",
        comment: "对应记录是否可用，1可用，0不可用",
        unsigned: true,
        default: () => "'1'",
    })
    status: number;

    @Column("varchar", {name: "remark", comment: "对应记录备注", length: 500})
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
