import { IsUUID } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";


@Entity('user')
export class User{
    @PrimaryGeneratedColumn("uuid")
    @IsUUID(4)
    id: string

    @Column()
    login: string

    @Column()
    password: string

    @VersionColumn()
    version: number

   /*  @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        transformer: {
          from(value: Date): number {
            return value.getTime();
          },
          to(value: Date) {
            return value;
          },
        },
      })
      createdAt: number;

      @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        transformer: {
          from(value: Date): number {
            return value.getTime();
          },
          to(value: Date) {
            return value;
          },
        },
      })
      updatedAt: number; */

    @CreateDateColumn()
    createdAt: number

    @CreateDateColumn()
    updatedAt: number

}