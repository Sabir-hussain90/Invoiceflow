import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AuditLogModel = runtime.Types.Result.DefaultSelection<Prisma.$AuditLogPayload>;
export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null;
    _min: AuditLogMinAggregateOutputType | null;
    _max: AuditLogMaxAggregateOutputType | null;
};
export type AuditLogMinAggregateOutputType = {
    id: string | null;
    shopId: string | null;
    userId: string | null;
    action: $Enums.AuditAction | null;
    entity: string | null;
    entityId: string | null;
    description: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date | null;
};
export type AuditLogMaxAggregateOutputType = {
    id: string | null;
    shopId: string | null;
    userId: string | null;
    action: $Enums.AuditAction | null;
    entity: string | null;
    entityId: string | null;
    description: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date | null;
};
export type AuditLogCountAggregateOutputType = {
    id: number;
    shopId: number;
    userId: number;
    action: number;
    entity: number;
    entityId: number;
    description: number;
    before: number;
    after: number;
    ipAddress: number;
    userAgent: number;
    createdAt: number;
    _all: number;
};
export type AuditLogMinAggregateInputType = {
    id?: true;
    shopId?: true;
    userId?: true;
    action?: true;
    entity?: true;
    entityId?: true;
    description?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
};
export type AuditLogMaxAggregateInputType = {
    id?: true;
    shopId?: true;
    userId?: true;
    action?: true;
    entity?: true;
    entityId?: true;
    description?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
};
export type AuditLogCountAggregateInputType = {
    id?: true;
    shopId?: true;
    userId?: true;
    action?: true;
    entity?: true;
    entityId?: true;
    description?: true;
    before?: true;
    after?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
    _all?: true;
};
export type AuditLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AuditLogCountAggregateInputType;
    _min?: AuditLogMinAggregateInputType;
    _max?: AuditLogMaxAggregateInputType;
};
export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
    [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAuditLog[P]> : Prisma.GetScalarType<T[P], AggregateAuditLog[P]>;
};
export type AuditLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithAggregationInput | Prisma.AuditLogOrderByWithAggregationInput[];
    by: Prisma.AuditLogScalarFieldEnum[] | Prisma.AuditLogScalarFieldEnum;
    having?: Prisma.AuditLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuditLogCountAggregateInputType | true;
    _min?: AuditLogMinAggregateInputType;
    _max?: AuditLogMaxAggregateInputType;
};
export type AuditLogGroupByOutputType = {
    id: string;
    shopId: string | null;
    userId: string | null;
    action: $Enums.AuditAction;
    entity: string | null;
    entityId: string | null;
    description: string | null;
    before: runtime.JsonValue | null;
    after: runtime.JsonValue | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date;
    _count: AuditLogCountAggregateOutputType | null;
    _min: AuditLogMinAggregateOutputType | null;
    _max: AuditLogMaxAggregateOutputType | null;
};
export type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AuditLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AuditLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AuditLogGroupByOutputType[P]>;
}>>;
export type AuditLogWhereInput = {
    AND?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    OR?: Prisma.AuditLogWhereInput[];
    NOT?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    id?: Prisma.StringFilter<"AuditLog"> | string;
    shopId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    userId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    action?: Prisma.EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction;
    entity?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    entityId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    description?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    before?: Prisma.JsonNullableFilter<"AuditLog">;
    after?: Prisma.JsonNullableFilter<"AuditLog">;
    ipAddress?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
    shop?: Prisma.XOR<Prisma.ShopNullableScalarRelationFilter, Prisma.ShopWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type AuditLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entity?: Prisma.SortOrderInput | Prisma.SortOrder;
    entityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    before?: Prisma.SortOrderInput | Prisma.SortOrder;
    after?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    shop?: Prisma.ShopOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    OR?: Prisma.AuditLogWhereInput[];
    NOT?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    shopId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    userId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    action?: Prisma.EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction;
    entity?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    entityId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    description?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    before?: Prisma.JsonNullableFilter<"AuditLog">;
    after?: Prisma.JsonNullableFilter<"AuditLog">;
    ipAddress?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
    shop?: Prisma.XOR<Prisma.ShopNullableScalarRelationFilter, Prisma.ShopWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type AuditLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entity?: Prisma.SortOrderInput | Prisma.SortOrder;
    entityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    before?: Prisma.SortOrderInput | Prisma.SortOrder;
    after?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AuditLogCountOrderByAggregateInput;
    _max?: Prisma.AuditLogMaxOrderByAggregateInput;
    _min?: Prisma.AuditLogMinOrderByAggregateInput;
};
export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.AuditLogScalarWhereWithAggregatesInput | Prisma.AuditLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.AuditLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AuditLogScalarWhereWithAggregatesInput | Prisma.AuditLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    shopId?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    userId?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    action?: Prisma.EnumAuditActionWithAggregatesFilter<"AuditLog"> | $Enums.AuditAction;
    entity?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    entityId?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    description?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    before?: Prisma.JsonNullableWithAggregatesFilter<"AuditLog">;
    after?: Prisma.JsonNullableWithAggregatesFilter<"AuditLog">;
    ipAddress?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    userAgent?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AuditLog"> | Date | string;
};
export type AuditLogCreateInput = {
    id?: string;
    action: $Enums.AuditAction;
    entity?: string | null;
    entityId?: string | null;
    description?: string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
    shop?: Prisma.ShopCreateNestedOneWithoutAuditLogsInput;
    user?: Prisma.UserCreateNestedOneWithoutAuditLogsInput;
};
export type AuditLogUncheckedCreateInput = {
    id?: string;
    shopId?: string | null;
    userId?: string | null;
    action: $Enums.AuditAction;
    entity?: string | null;
    entityId?: string | null;
    description?: string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type AuditLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    entity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneWithoutAuditLogsNestedInput;
    user?: Prisma.UserUpdateOneWithoutAuditLogsNestedInput;
};
export type AuditLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    entity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogCreateManyInput = {
    id?: string;
    shopId?: string | null;
    userId?: string | null;
    action: $Enums.AuditAction;
    entity?: string | null;
    entityId?: string | null;
    description?: string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type AuditLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    entity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    entity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogListRelationFilter = {
    every?: Prisma.AuditLogWhereInput;
    some?: Prisma.AuditLogWhereInput;
    none?: Prisma.AuditLogWhereInput;
};
export type AuditLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AuditLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entity?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    before?: Prisma.SortOrder;
    after?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entity?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entity?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutUserInput, Prisma.AuditLogUncheckedCreateWithoutUserInput> | Prisma.AuditLogCreateWithoutUserInput[] | Prisma.AuditLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutUserInput | Prisma.AuditLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AuditLogCreateManyUserInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutUserInput, Prisma.AuditLogUncheckedCreateWithoutUserInput> | Prisma.AuditLogCreateWithoutUserInput[] | Prisma.AuditLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutUserInput | Prisma.AuditLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AuditLogCreateManyUserInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutUserInput, Prisma.AuditLogUncheckedCreateWithoutUserInput> | Prisma.AuditLogCreateWithoutUserInput[] | Prisma.AuditLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutUserInput | Prisma.AuditLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutUserInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AuditLogCreateManyUserInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutUserInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutUserInput | Prisma.AuditLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutUserInput, Prisma.AuditLogUncheckedCreateWithoutUserInput> | Prisma.AuditLogCreateWithoutUserInput[] | Prisma.AuditLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutUserInput | Prisma.AuditLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutUserInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AuditLogCreateManyUserInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutUserInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutUserInput | Prisma.AuditLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type AuditLogCreateNestedManyWithoutShopInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutShopInput, Prisma.AuditLogUncheckedCreateWithoutShopInput> | Prisma.AuditLogCreateWithoutShopInput[] | Prisma.AuditLogUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutShopInput | Prisma.AuditLogCreateOrConnectWithoutShopInput[];
    createMany?: Prisma.AuditLogCreateManyShopInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUncheckedCreateNestedManyWithoutShopInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutShopInput, Prisma.AuditLogUncheckedCreateWithoutShopInput> | Prisma.AuditLogCreateWithoutShopInput[] | Prisma.AuditLogUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutShopInput | Prisma.AuditLogCreateOrConnectWithoutShopInput[];
    createMany?: Prisma.AuditLogCreateManyShopInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUpdateManyWithoutShopNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutShopInput, Prisma.AuditLogUncheckedCreateWithoutShopInput> | Prisma.AuditLogCreateWithoutShopInput[] | Prisma.AuditLogUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutShopInput | Prisma.AuditLogCreateOrConnectWithoutShopInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutShopInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutShopInput[];
    createMany?: Prisma.AuditLogCreateManyShopInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutShopInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutShopInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutShopInput | Prisma.AuditLogUpdateManyWithWhereWithoutShopInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type AuditLogUncheckedUpdateManyWithoutShopNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutShopInput, Prisma.AuditLogUncheckedCreateWithoutShopInput> | Prisma.AuditLogCreateWithoutShopInput[] | Prisma.AuditLogUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutShopInput | Prisma.AuditLogCreateOrConnectWithoutShopInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutShopInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutShopInput[];
    createMany?: Prisma.AuditLogCreateManyShopInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutShopInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutShopInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutShopInput | Prisma.AuditLogUpdateManyWithWhereWithoutShopInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type EnumAuditActionFieldUpdateOperationsInput = {
    set?: $Enums.AuditAction;
};
export type AuditLogCreateWithoutUserInput = {
    id?: string;
    action: $Enums.AuditAction;
    entity?: string | null;
    entityId?: string | null;
    description?: string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
    shop?: Prisma.ShopCreateNestedOneWithoutAuditLogsInput;
};
export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string;
    shopId?: string | null;
    action: $Enums.AuditAction;
    entity?: string | null;
    entityId?: string | null;
    description?: string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type AuditLogCreateOrConnectWithoutUserInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutUserInput, Prisma.AuditLogUncheckedCreateWithoutUserInput>;
};
export type AuditLogCreateManyUserInputEnvelope = {
    data: Prisma.AuditLogCreateManyUserInput | Prisma.AuditLogCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuditLogUpdateWithoutUserInput, Prisma.AuditLogUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutUserInput, Prisma.AuditLogUncheckedCreateWithoutUserInput>;
};
export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateWithoutUserInput, Prisma.AuditLogUncheckedUpdateWithoutUserInput>;
};
export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyWithoutUserInput>;
};
export type AuditLogScalarWhereInput = {
    AND?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
    OR?: Prisma.AuditLogScalarWhereInput[];
    NOT?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
    id?: Prisma.StringFilter<"AuditLog"> | string;
    shopId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    userId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    action?: Prisma.EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction;
    entity?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    entityId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    description?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    before?: Prisma.JsonNullableFilter<"AuditLog">;
    after?: Prisma.JsonNullableFilter<"AuditLog">;
    ipAddress?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
};
export type AuditLogCreateWithoutShopInput = {
    id?: string;
    action: $Enums.AuditAction;
    entity?: string | null;
    entityId?: string | null;
    description?: string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutAuditLogsInput;
};
export type AuditLogUncheckedCreateWithoutShopInput = {
    id?: string;
    userId?: string | null;
    action: $Enums.AuditAction;
    entity?: string | null;
    entityId?: string | null;
    description?: string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type AuditLogCreateOrConnectWithoutShopInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutShopInput, Prisma.AuditLogUncheckedCreateWithoutShopInput>;
};
export type AuditLogCreateManyShopInputEnvelope = {
    data: Prisma.AuditLogCreateManyShopInput | Prisma.AuditLogCreateManyShopInput[];
    skipDuplicates?: boolean;
};
export type AuditLogUpsertWithWhereUniqueWithoutShopInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuditLogUpdateWithoutShopInput, Prisma.AuditLogUncheckedUpdateWithoutShopInput>;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutShopInput, Prisma.AuditLogUncheckedCreateWithoutShopInput>;
};
export type AuditLogUpdateWithWhereUniqueWithoutShopInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateWithoutShopInput, Prisma.AuditLogUncheckedUpdateWithoutShopInput>;
};
export type AuditLogUpdateManyWithWhereWithoutShopInput = {
    where: Prisma.AuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyWithoutShopInput>;
};
export type AuditLogCreateManyUserInput = {
    id?: string;
    shopId?: string | null;
    action: $Enums.AuditAction;
    entity?: string | null;
    entityId?: string | null;
    description?: string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type AuditLogUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    entity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneWithoutAuditLogsNestedInput;
};
export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    entity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    entity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogCreateManyShopInput = {
    id?: string;
    userId?: string | null;
    action: $Enums.AuditAction;
    entity?: string | null;
    entityId?: string | null;
    description?: string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type AuditLogUpdateWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    entity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutAuditLogsNestedInput;
};
export type AuditLogUncheckedUpdateWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    entity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogUncheckedUpdateManyWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    entity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    userId?: boolean;
    action?: boolean;
    entity?: boolean;
    entityId?: boolean;
    description?: boolean;
    before?: boolean;
    after?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
    shop?: boolean | Prisma.AuditLog$shopArgs<ExtArgs>;
    user?: boolean | Prisma.AuditLog$userArgs<ExtArgs>;
}, ExtArgs["result"]["auditLog"]>;
export type AuditLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    userId?: boolean;
    action?: boolean;
    entity?: boolean;
    entityId?: boolean;
    description?: boolean;
    before?: boolean;
    after?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
    shop?: boolean | Prisma.AuditLog$shopArgs<ExtArgs>;
    user?: boolean | Prisma.AuditLog$userArgs<ExtArgs>;
}, ExtArgs["result"]["auditLog"]>;
export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    userId?: boolean;
    action?: boolean;
    entity?: boolean;
    entityId?: boolean;
    description?: boolean;
    before?: boolean;
    after?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
    shop?: boolean | Prisma.AuditLog$shopArgs<ExtArgs>;
    user?: boolean | Prisma.AuditLog$userArgs<ExtArgs>;
}, ExtArgs["result"]["auditLog"]>;
export type AuditLogSelectScalar = {
    id?: boolean;
    shopId?: boolean;
    userId?: boolean;
    action?: boolean;
    entity?: boolean;
    entityId?: boolean;
    description?: boolean;
    before?: boolean;
    after?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
};
export type AuditLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "shopId" | "userId" | "action" | "entity" | "entityId" | "description" | "before" | "after" | "ipAddress" | "userAgent" | "createdAt", ExtArgs["result"]["auditLog"]>;
export type AuditLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.AuditLog$shopArgs<ExtArgs>;
    user?: boolean | Prisma.AuditLog$userArgs<ExtArgs>;
};
export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.AuditLog$shopArgs<ExtArgs>;
    user?: boolean | Prisma.AuditLog$userArgs<ExtArgs>;
};
export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.AuditLog$shopArgs<ExtArgs>;
    user?: boolean | Prisma.AuditLog$userArgs<ExtArgs>;
};
export type $AuditLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AuditLog";
    objects: {
        shop: Prisma.$ShopPayload<ExtArgs> | null;
        user: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        shopId: string | null;
        userId: string | null;
        action: $Enums.AuditAction;
        entity: string | null;
        entityId: string | null;
        description: string | null;
        before: runtime.JsonValue | null;
        after: runtime.JsonValue | null;
        ipAddress: string | null;
        userAgent: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["auditLog"]>;
    composites: {};
};
export type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AuditLogPayload, S>;
export type AuditLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AuditLogCountAggregateInputType | true;
};
export interface AuditLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'];
        meta: {
            name: 'AuditLog';
        };
    };
    findUnique<T extends AuditLogFindUniqueArgs>(args: Prisma.SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AuditLogFindFirstArgs>(args?: Prisma.SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AuditLogFindManyArgs>(args?: Prisma.SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AuditLogCreateArgs>(args: Prisma.SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AuditLogCreateManyArgs>(args?: Prisma.SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AuditLogDeleteArgs>(args: Prisma.SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AuditLogUpdateArgs>(args: Prisma.SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AuditLogUpdateManyArgs>(args: Prisma.SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AuditLogUpsertArgs>(args: Prisma.SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AuditLogCountArgs>(args?: Prisma.Subset<T, AuditLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AuditLogCountAggregateOutputType> : number>;
    aggregate<T extends AuditLogAggregateArgs>(args: Prisma.Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>;
    groupBy<T extends AuditLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AuditLogGroupByArgs['orderBy'];
    } : {
        orderBy?: AuditLogGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AuditLogFieldRefs;
}
export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    shop<T extends Prisma.AuditLog$shopArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AuditLog$shopArgs<ExtArgs>>): Prisma.Prisma__ShopClient<runtime.Types.Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.AuditLog$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AuditLog$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AuditLogFieldRefs {
    readonly id: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly shopId: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly userId: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly action: Prisma.FieldRef<"AuditLog", 'AuditAction'>;
    readonly entity: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly entityId: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly description: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly before: Prisma.FieldRef<"AuditLog", 'Json'>;
    readonly after: Prisma.FieldRef<"AuditLog", 'Json'>;
    readonly ipAddress: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly userAgent: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AuditLog", 'DateTime'>;
}
export type AuditLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
export type AuditLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
export type AuditLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
export type AuditLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditLogCreateInput, Prisma.AuditLogUncheckedCreateInput>;
};
export type AuditLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AuditLogCreateManyInput | Prisma.AuditLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AuditLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    data: Prisma.AuditLogCreateManyInput | Prisma.AuditLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AuditLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AuditLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditLogUpdateInput, Prisma.AuditLogUncheckedUpdateInput>;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyInput>;
    where?: Prisma.AuditLogWhereInput;
    limit?: number;
};
export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyInput>;
    where?: Prisma.AuditLogWhereInput;
    limit?: number;
    include?: Prisma.AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AuditLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditLogCreateInput, Prisma.AuditLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AuditLogUpdateInput, Prisma.AuditLogUncheckedUpdateInput>;
};
export type AuditLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
    limit?: number;
};
export type AuditLog$shopArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShopSelect<ExtArgs> | null;
    omit?: Prisma.ShopOmit<ExtArgs> | null;
    include?: Prisma.ShopInclude<ExtArgs> | null;
    where?: Prisma.ShopWhereInput;
};
export type AuditLog$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type AuditLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
};
