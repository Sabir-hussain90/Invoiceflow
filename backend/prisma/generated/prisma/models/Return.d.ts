import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReturnModel = runtime.Types.Result.DefaultSelection<Prisma.$ReturnPayload>;
export type AggregateReturn = {
    _count: ReturnCountAggregateOutputType | null;
    _avg: ReturnAvgAggregateOutputType | null;
    _sum: ReturnSumAggregateOutputType | null;
    _min: ReturnMinAggregateOutputType | null;
    _max: ReturnMaxAggregateOutputType | null;
};
export type ReturnAvgAggregateOutputType = {
    refundAmount: runtime.Decimal | null;
};
export type ReturnSumAggregateOutputType = {
    refundAmount: runtime.Decimal | null;
};
export type ReturnMinAggregateOutputType = {
    id: string | null;
    shopId: string | null;
    returnNumber: string | null;
    saleId: string | null;
    customerId: string | null;
    processedById: string | null;
    reason: string | null;
    notes: string | null;
    refundAmount: runtime.Decimal | null;
    refundMethod: $Enums.PaymentMethod | null;
    restockItems: boolean | null;
    returnDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ReturnMaxAggregateOutputType = {
    id: string | null;
    shopId: string | null;
    returnNumber: string | null;
    saleId: string | null;
    customerId: string | null;
    processedById: string | null;
    reason: string | null;
    notes: string | null;
    refundAmount: runtime.Decimal | null;
    refundMethod: $Enums.PaymentMethod | null;
    restockItems: boolean | null;
    returnDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ReturnCountAggregateOutputType = {
    id: number;
    shopId: number;
    returnNumber: number;
    saleId: number;
    customerId: number;
    processedById: number;
    reason: number;
    notes: number;
    refundAmount: number;
    refundMethod: number;
    restockItems: number;
    returnDate: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ReturnAvgAggregateInputType = {
    refundAmount?: true;
};
export type ReturnSumAggregateInputType = {
    refundAmount?: true;
};
export type ReturnMinAggregateInputType = {
    id?: true;
    shopId?: true;
    returnNumber?: true;
    saleId?: true;
    customerId?: true;
    processedById?: true;
    reason?: true;
    notes?: true;
    refundAmount?: true;
    refundMethod?: true;
    restockItems?: true;
    returnDate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ReturnMaxAggregateInputType = {
    id?: true;
    shopId?: true;
    returnNumber?: true;
    saleId?: true;
    customerId?: true;
    processedById?: true;
    reason?: true;
    notes?: true;
    refundAmount?: true;
    refundMethod?: true;
    restockItems?: true;
    returnDate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ReturnCountAggregateInputType = {
    id?: true;
    shopId?: true;
    returnNumber?: true;
    saleId?: true;
    customerId?: true;
    processedById?: true;
    reason?: true;
    notes?: true;
    refundAmount?: true;
    refundMethod?: true;
    restockItems?: true;
    returnDate?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ReturnAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReturnWhereInput;
    orderBy?: Prisma.ReturnOrderByWithRelationInput | Prisma.ReturnOrderByWithRelationInput[];
    cursor?: Prisma.ReturnWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReturnCountAggregateInputType;
    _avg?: ReturnAvgAggregateInputType;
    _sum?: ReturnSumAggregateInputType;
    _min?: ReturnMinAggregateInputType;
    _max?: ReturnMaxAggregateInputType;
};
export type GetReturnAggregateType<T extends ReturnAggregateArgs> = {
    [P in keyof T & keyof AggregateReturn]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReturn[P]> : Prisma.GetScalarType<T[P], AggregateReturn[P]>;
};
export type ReturnGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReturnWhereInput;
    orderBy?: Prisma.ReturnOrderByWithAggregationInput | Prisma.ReturnOrderByWithAggregationInput[];
    by: Prisma.ReturnScalarFieldEnum[] | Prisma.ReturnScalarFieldEnum;
    having?: Prisma.ReturnScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReturnCountAggregateInputType | true;
    _avg?: ReturnAvgAggregateInputType;
    _sum?: ReturnSumAggregateInputType;
    _min?: ReturnMinAggregateInputType;
    _max?: ReturnMaxAggregateInputType;
};
export type ReturnGroupByOutputType = {
    id: string;
    shopId: string;
    returnNumber: string;
    saleId: string;
    customerId: string | null;
    processedById: string;
    reason: string;
    notes: string | null;
    refundAmount: runtime.Decimal;
    refundMethod: $Enums.PaymentMethod;
    restockItems: boolean;
    returnDate: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: ReturnCountAggregateOutputType | null;
    _avg: ReturnAvgAggregateOutputType | null;
    _sum: ReturnSumAggregateOutputType | null;
    _min: ReturnMinAggregateOutputType | null;
    _max: ReturnMaxAggregateOutputType | null;
};
export type GetReturnGroupByPayload<T extends ReturnGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReturnGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReturnGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReturnGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReturnGroupByOutputType[P]>;
}>>;
export type ReturnWhereInput = {
    AND?: Prisma.ReturnWhereInput | Prisma.ReturnWhereInput[];
    OR?: Prisma.ReturnWhereInput[];
    NOT?: Prisma.ReturnWhereInput | Prisma.ReturnWhereInput[];
    id?: Prisma.StringFilter<"Return"> | string;
    shopId?: Prisma.StringFilter<"Return"> | string;
    returnNumber?: Prisma.StringFilter<"Return"> | string;
    saleId?: Prisma.StringFilter<"Return"> | string;
    customerId?: Prisma.StringNullableFilter<"Return"> | string | null;
    processedById?: Prisma.StringFilter<"Return"> | string;
    reason?: Prisma.StringFilter<"Return"> | string;
    notes?: Prisma.StringNullableFilter<"Return"> | string | null;
    refundAmount?: Prisma.DecimalFilter<"Return"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFilter<"Return"> | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFilter<"Return"> | boolean;
    returnDate?: Prisma.DateTimeFilter<"Return"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Return"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Return"> | Date | string;
    shop?: Prisma.XOR<Prisma.ShopScalarRelationFilter, Prisma.ShopWhereInput>;
    sale?: Prisma.XOR<Prisma.SaleScalarRelationFilter, Prisma.SaleWhereInput>;
    customer?: Prisma.XOR<Prisma.CustomerNullableScalarRelationFilter, Prisma.CustomerWhereInput> | null;
    processedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    items?: Prisma.ReturnItemListRelationFilter;
};
export type ReturnOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    returnNumber?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    processedById?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    refundAmount?: Prisma.SortOrder;
    refundMethod?: Prisma.SortOrder;
    restockItems?: Prisma.SortOrder;
    returnDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    shop?: Prisma.ShopOrderByWithRelationInput;
    sale?: Prisma.SaleOrderByWithRelationInput;
    customer?: Prisma.CustomerOrderByWithRelationInput;
    processedBy?: Prisma.UserOrderByWithRelationInput;
    items?: Prisma.ReturnItemOrderByRelationAggregateInput;
};
export type ReturnWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    shopId_returnNumber?: Prisma.ReturnShopIdReturnNumberCompoundUniqueInput;
    AND?: Prisma.ReturnWhereInput | Prisma.ReturnWhereInput[];
    OR?: Prisma.ReturnWhereInput[];
    NOT?: Prisma.ReturnWhereInput | Prisma.ReturnWhereInput[];
    shopId?: Prisma.StringFilter<"Return"> | string;
    returnNumber?: Prisma.StringFilter<"Return"> | string;
    saleId?: Prisma.StringFilter<"Return"> | string;
    customerId?: Prisma.StringNullableFilter<"Return"> | string | null;
    processedById?: Prisma.StringFilter<"Return"> | string;
    reason?: Prisma.StringFilter<"Return"> | string;
    notes?: Prisma.StringNullableFilter<"Return"> | string | null;
    refundAmount?: Prisma.DecimalFilter<"Return"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFilter<"Return"> | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFilter<"Return"> | boolean;
    returnDate?: Prisma.DateTimeFilter<"Return"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Return"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Return"> | Date | string;
    shop?: Prisma.XOR<Prisma.ShopScalarRelationFilter, Prisma.ShopWhereInput>;
    sale?: Prisma.XOR<Prisma.SaleScalarRelationFilter, Prisma.SaleWhereInput>;
    customer?: Prisma.XOR<Prisma.CustomerNullableScalarRelationFilter, Prisma.CustomerWhereInput> | null;
    processedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    items?: Prisma.ReturnItemListRelationFilter;
}, "id" | "shopId_returnNumber">;
export type ReturnOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    returnNumber?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    processedById?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    refundAmount?: Prisma.SortOrder;
    refundMethod?: Prisma.SortOrder;
    restockItems?: Prisma.SortOrder;
    returnDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ReturnCountOrderByAggregateInput;
    _avg?: Prisma.ReturnAvgOrderByAggregateInput;
    _max?: Prisma.ReturnMaxOrderByAggregateInput;
    _min?: Prisma.ReturnMinOrderByAggregateInput;
    _sum?: Prisma.ReturnSumOrderByAggregateInput;
};
export type ReturnScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReturnScalarWhereWithAggregatesInput | Prisma.ReturnScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReturnScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReturnScalarWhereWithAggregatesInput | Prisma.ReturnScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Return"> | string;
    shopId?: Prisma.StringWithAggregatesFilter<"Return"> | string;
    returnNumber?: Prisma.StringWithAggregatesFilter<"Return"> | string;
    saleId?: Prisma.StringWithAggregatesFilter<"Return"> | string;
    customerId?: Prisma.StringNullableWithAggregatesFilter<"Return"> | string | null;
    processedById?: Prisma.StringWithAggregatesFilter<"Return"> | string;
    reason?: Prisma.StringWithAggregatesFilter<"Return"> | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"Return"> | string | null;
    refundAmount?: Prisma.DecimalWithAggregatesFilter<"Return"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodWithAggregatesFilter<"Return"> | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolWithAggregatesFilter<"Return"> | boolean;
    returnDate?: Prisma.DateTimeWithAggregatesFilter<"Return"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Return"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Return"> | Date | string;
};
export type ReturnCreateInput = {
    id?: string;
    returnNumber: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutReturnsInput;
    sale: Prisma.SaleCreateNestedOneWithoutReturnsInput;
    customer?: Prisma.CustomerCreateNestedOneWithoutReturnsInput;
    processedBy: Prisma.UserCreateNestedOneWithoutReturnsInput;
    items?: Prisma.ReturnItemCreateNestedManyWithoutReturnInput;
};
export type ReturnUncheckedCreateInput = {
    id?: string;
    shopId: string;
    returnNumber: string;
    saleId: string;
    customerId?: string | null;
    processedById: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.ReturnItemUncheckedCreateNestedManyWithoutReturnInput;
};
export type ReturnUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutReturnsNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutReturnsNestedInput;
    customer?: Prisma.CustomerUpdateOneWithoutReturnsNestedInput;
    processedBy?: Prisma.UserUpdateOneRequiredWithoutReturnsNestedInput;
    items?: Prisma.ReturnItemUpdateManyWithoutReturnNestedInput;
};
export type ReturnUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    processedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.ReturnItemUncheckedUpdateManyWithoutReturnNestedInput;
};
export type ReturnCreateManyInput = {
    id?: string;
    shopId: string;
    returnNumber: string;
    saleId: string;
    customerId?: string | null;
    processedById: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReturnUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    processedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnListRelationFilter = {
    every?: Prisma.ReturnWhereInput;
    some?: Prisma.ReturnWhereInput;
    none?: Prisma.ReturnWhereInput;
};
export type ReturnOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReturnShopIdReturnNumberCompoundUniqueInput = {
    shopId: string;
    returnNumber: string;
};
export type ReturnCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    returnNumber?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    processedById?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    refundAmount?: Prisma.SortOrder;
    refundMethod?: Prisma.SortOrder;
    restockItems?: Prisma.SortOrder;
    returnDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReturnAvgOrderByAggregateInput = {
    refundAmount?: Prisma.SortOrder;
};
export type ReturnMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    returnNumber?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    processedById?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    refundAmount?: Prisma.SortOrder;
    refundMethod?: Prisma.SortOrder;
    restockItems?: Prisma.SortOrder;
    returnDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReturnMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    returnNumber?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    processedById?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    refundAmount?: Prisma.SortOrder;
    refundMethod?: Prisma.SortOrder;
    restockItems?: Prisma.SortOrder;
    returnDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReturnSumOrderByAggregateInput = {
    refundAmount?: Prisma.SortOrder;
};
export type ReturnScalarRelationFilter = {
    is?: Prisma.ReturnWhereInput;
    isNot?: Prisma.ReturnWhereInput;
};
export type ReturnCreateNestedManyWithoutProcessedByInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutProcessedByInput, Prisma.ReturnUncheckedCreateWithoutProcessedByInput> | Prisma.ReturnCreateWithoutProcessedByInput[] | Prisma.ReturnUncheckedCreateWithoutProcessedByInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutProcessedByInput | Prisma.ReturnCreateOrConnectWithoutProcessedByInput[];
    createMany?: Prisma.ReturnCreateManyProcessedByInputEnvelope;
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
};
export type ReturnUncheckedCreateNestedManyWithoutProcessedByInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutProcessedByInput, Prisma.ReturnUncheckedCreateWithoutProcessedByInput> | Prisma.ReturnCreateWithoutProcessedByInput[] | Prisma.ReturnUncheckedCreateWithoutProcessedByInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutProcessedByInput | Prisma.ReturnCreateOrConnectWithoutProcessedByInput[];
    createMany?: Prisma.ReturnCreateManyProcessedByInputEnvelope;
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
};
export type ReturnUpdateManyWithoutProcessedByNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutProcessedByInput, Prisma.ReturnUncheckedCreateWithoutProcessedByInput> | Prisma.ReturnCreateWithoutProcessedByInput[] | Prisma.ReturnUncheckedCreateWithoutProcessedByInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutProcessedByInput | Prisma.ReturnCreateOrConnectWithoutProcessedByInput[];
    upsert?: Prisma.ReturnUpsertWithWhereUniqueWithoutProcessedByInput | Prisma.ReturnUpsertWithWhereUniqueWithoutProcessedByInput[];
    createMany?: Prisma.ReturnCreateManyProcessedByInputEnvelope;
    set?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    disconnect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    delete?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    update?: Prisma.ReturnUpdateWithWhereUniqueWithoutProcessedByInput | Prisma.ReturnUpdateWithWhereUniqueWithoutProcessedByInput[];
    updateMany?: Prisma.ReturnUpdateManyWithWhereWithoutProcessedByInput | Prisma.ReturnUpdateManyWithWhereWithoutProcessedByInput[];
    deleteMany?: Prisma.ReturnScalarWhereInput | Prisma.ReturnScalarWhereInput[];
};
export type ReturnUncheckedUpdateManyWithoutProcessedByNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutProcessedByInput, Prisma.ReturnUncheckedCreateWithoutProcessedByInput> | Prisma.ReturnCreateWithoutProcessedByInput[] | Prisma.ReturnUncheckedCreateWithoutProcessedByInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutProcessedByInput | Prisma.ReturnCreateOrConnectWithoutProcessedByInput[];
    upsert?: Prisma.ReturnUpsertWithWhereUniqueWithoutProcessedByInput | Prisma.ReturnUpsertWithWhereUniqueWithoutProcessedByInput[];
    createMany?: Prisma.ReturnCreateManyProcessedByInputEnvelope;
    set?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    disconnect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    delete?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    update?: Prisma.ReturnUpdateWithWhereUniqueWithoutProcessedByInput | Prisma.ReturnUpdateWithWhereUniqueWithoutProcessedByInput[];
    updateMany?: Prisma.ReturnUpdateManyWithWhereWithoutProcessedByInput | Prisma.ReturnUpdateManyWithWhereWithoutProcessedByInput[];
    deleteMany?: Prisma.ReturnScalarWhereInput | Prisma.ReturnScalarWhereInput[];
};
export type ReturnCreateNestedManyWithoutShopInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutShopInput, Prisma.ReturnUncheckedCreateWithoutShopInput> | Prisma.ReturnCreateWithoutShopInput[] | Prisma.ReturnUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutShopInput | Prisma.ReturnCreateOrConnectWithoutShopInput[];
    createMany?: Prisma.ReturnCreateManyShopInputEnvelope;
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
};
export type ReturnUncheckedCreateNestedManyWithoutShopInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutShopInput, Prisma.ReturnUncheckedCreateWithoutShopInput> | Prisma.ReturnCreateWithoutShopInput[] | Prisma.ReturnUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutShopInput | Prisma.ReturnCreateOrConnectWithoutShopInput[];
    createMany?: Prisma.ReturnCreateManyShopInputEnvelope;
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
};
export type ReturnUpdateManyWithoutShopNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutShopInput, Prisma.ReturnUncheckedCreateWithoutShopInput> | Prisma.ReturnCreateWithoutShopInput[] | Prisma.ReturnUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutShopInput | Prisma.ReturnCreateOrConnectWithoutShopInput[];
    upsert?: Prisma.ReturnUpsertWithWhereUniqueWithoutShopInput | Prisma.ReturnUpsertWithWhereUniqueWithoutShopInput[];
    createMany?: Prisma.ReturnCreateManyShopInputEnvelope;
    set?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    disconnect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    delete?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    update?: Prisma.ReturnUpdateWithWhereUniqueWithoutShopInput | Prisma.ReturnUpdateWithWhereUniqueWithoutShopInput[];
    updateMany?: Prisma.ReturnUpdateManyWithWhereWithoutShopInput | Prisma.ReturnUpdateManyWithWhereWithoutShopInput[];
    deleteMany?: Prisma.ReturnScalarWhereInput | Prisma.ReturnScalarWhereInput[];
};
export type ReturnUncheckedUpdateManyWithoutShopNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutShopInput, Prisma.ReturnUncheckedCreateWithoutShopInput> | Prisma.ReturnCreateWithoutShopInput[] | Prisma.ReturnUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutShopInput | Prisma.ReturnCreateOrConnectWithoutShopInput[];
    upsert?: Prisma.ReturnUpsertWithWhereUniqueWithoutShopInput | Prisma.ReturnUpsertWithWhereUniqueWithoutShopInput[];
    createMany?: Prisma.ReturnCreateManyShopInputEnvelope;
    set?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    disconnect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    delete?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    update?: Prisma.ReturnUpdateWithWhereUniqueWithoutShopInput | Prisma.ReturnUpdateWithWhereUniqueWithoutShopInput[];
    updateMany?: Prisma.ReturnUpdateManyWithWhereWithoutShopInput | Prisma.ReturnUpdateManyWithWhereWithoutShopInput[];
    deleteMany?: Prisma.ReturnScalarWhereInput | Prisma.ReturnScalarWhereInput[];
};
export type ReturnCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutCustomerInput, Prisma.ReturnUncheckedCreateWithoutCustomerInput> | Prisma.ReturnCreateWithoutCustomerInput[] | Prisma.ReturnUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutCustomerInput | Prisma.ReturnCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.ReturnCreateManyCustomerInputEnvelope;
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
};
export type ReturnUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutCustomerInput, Prisma.ReturnUncheckedCreateWithoutCustomerInput> | Prisma.ReturnCreateWithoutCustomerInput[] | Prisma.ReturnUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutCustomerInput | Prisma.ReturnCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.ReturnCreateManyCustomerInputEnvelope;
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
};
export type ReturnUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutCustomerInput, Prisma.ReturnUncheckedCreateWithoutCustomerInput> | Prisma.ReturnCreateWithoutCustomerInput[] | Prisma.ReturnUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutCustomerInput | Prisma.ReturnCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.ReturnUpsertWithWhereUniqueWithoutCustomerInput | Prisma.ReturnUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.ReturnCreateManyCustomerInputEnvelope;
    set?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    disconnect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    delete?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    update?: Prisma.ReturnUpdateWithWhereUniqueWithoutCustomerInput | Prisma.ReturnUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.ReturnUpdateManyWithWhereWithoutCustomerInput | Prisma.ReturnUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.ReturnScalarWhereInput | Prisma.ReturnScalarWhereInput[];
};
export type ReturnUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutCustomerInput, Prisma.ReturnUncheckedCreateWithoutCustomerInput> | Prisma.ReturnCreateWithoutCustomerInput[] | Prisma.ReturnUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutCustomerInput | Prisma.ReturnCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.ReturnUpsertWithWhereUniqueWithoutCustomerInput | Prisma.ReturnUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.ReturnCreateManyCustomerInputEnvelope;
    set?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    disconnect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    delete?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    update?: Prisma.ReturnUpdateWithWhereUniqueWithoutCustomerInput | Prisma.ReturnUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.ReturnUpdateManyWithWhereWithoutCustomerInput | Prisma.ReturnUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.ReturnScalarWhereInput | Prisma.ReturnScalarWhereInput[];
};
export type ReturnCreateNestedManyWithoutSaleInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutSaleInput, Prisma.ReturnUncheckedCreateWithoutSaleInput> | Prisma.ReturnCreateWithoutSaleInput[] | Prisma.ReturnUncheckedCreateWithoutSaleInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutSaleInput | Prisma.ReturnCreateOrConnectWithoutSaleInput[];
    createMany?: Prisma.ReturnCreateManySaleInputEnvelope;
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
};
export type ReturnUncheckedCreateNestedManyWithoutSaleInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutSaleInput, Prisma.ReturnUncheckedCreateWithoutSaleInput> | Prisma.ReturnCreateWithoutSaleInput[] | Prisma.ReturnUncheckedCreateWithoutSaleInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutSaleInput | Prisma.ReturnCreateOrConnectWithoutSaleInput[];
    createMany?: Prisma.ReturnCreateManySaleInputEnvelope;
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
};
export type ReturnUpdateManyWithoutSaleNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutSaleInput, Prisma.ReturnUncheckedCreateWithoutSaleInput> | Prisma.ReturnCreateWithoutSaleInput[] | Prisma.ReturnUncheckedCreateWithoutSaleInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutSaleInput | Prisma.ReturnCreateOrConnectWithoutSaleInput[];
    upsert?: Prisma.ReturnUpsertWithWhereUniqueWithoutSaleInput | Prisma.ReturnUpsertWithWhereUniqueWithoutSaleInput[];
    createMany?: Prisma.ReturnCreateManySaleInputEnvelope;
    set?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    disconnect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    delete?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    update?: Prisma.ReturnUpdateWithWhereUniqueWithoutSaleInput | Prisma.ReturnUpdateWithWhereUniqueWithoutSaleInput[];
    updateMany?: Prisma.ReturnUpdateManyWithWhereWithoutSaleInput | Prisma.ReturnUpdateManyWithWhereWithoutSaleInput[];
    deleteMany?: Prisma.ReturnScalarWhereInput | Prisma.ReturnScalarWhereInput[];
};
export type ReturnUncheckedUpdateManyWithoutSaleNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutSaleInput, Prisma.ReturnUncheckedCreateWithoutSaleInput> | Prisma.ReturnCreateWithoutSaleInput[] | Prisma.ReturnUncheckedCreateWithoutSaleInput[];
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutSaleInput | Prisma.ReturnCreateOrConnectWithoutSaleInput[];
    upsert?: Prisma.ReturnUpsertWithWhereUniqueWithoutSaleInput | Prisma.ReturnUpsertWithWhereUniqueWithoutSaleInput[];
    createMany?: Prisma.ReturnCreateManySaleInputEnvelope;
    set?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    disconnect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    delete?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    connect?: Prisma.ReturnWhereUniqueInput | Prisma.ReturnWhereUniqueInput[];
    update?: Prisma.ReturnUpdateWithWhereUniqueWithoutSaleInput | Prisma.ReturnUpdateWithWhereUniqueWithoutSaleInput[];
    updateMany?: Prisma.ReturnUpdateManyWithWhereWithoutSaleInput | Prisma.ReturnUpdateManyWithWhereWithoutSaleInput[];
    deleteMany?: Prisma.ReturnScalarWhereInput | Prisma.ReturnScalarWhereInput[];
};
export type ReturnCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutItemsInput, Prisma.ReturnUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutItemsInput;
    connect?: Prisma.ReturnWhereUniqueInput;
};
export type ReturnUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnCreateWithoutItemsInput, Prisma.ReturnUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.ReturnCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.ReturnUpsertWithoutItemsInput;
    connect?: Prisma.ReturnWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReturnUpdateToOneWithWhereWithoutItemsInput, Prisma.ReturnUpdateWithoutItemsInput>, Prisma.ReturnUncheckedUpdateWithoutItemsInput>;
};
export type ReturnCreateWithoutProcessedByInput = {
    id?: string;
    returnNumber: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutReturnsInput;
    sale: Prisma.SaleCreateNestedOneWithoutReturnsInput;
    customer?: Prisma.CustomerCreateNestedOneWithoutReturnsInput;
    items?: Prisma.ReturnItemCreateNestedManyWithoutReturnInput;
};
export type ReturnUncheckedCreateWithoutProcessedByInput = {
    id?: string;
    shopId: string;
    returnNumber: string;
    saleId: string;
    customerId?: string | null;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.ReturnItemUncheckedCreateNestedManyWithoutReturnInput;
};
export type ReturnCreateOrConnectWithoutProcessedByInput = {
    where: Prisma.ReturnWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReturnCreateWithoutProcessedByInput, Prisma.ReturnUncheckedCreateWithoutProcessedByInput>;
};
export type ReturnCreateManyProcessedByInputEnvelope = {
    data: Prisma.ReturnCreateManyProcessedByInput | Prisma.ReturnCreateManyProcessedByInput[];
    skipDuplicates?: boolean;
};
export type ReturnUpsertWithWhereUniqueWithoutProcessedByInput = {
    where: Prisma.ReturnWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReturnUpdateWithoutProcessedByInput, Prisma.ReturnUncheckedUpdateWithoutProcessedByInput>;
    create: Prisma.XOR<Prisma.ReturnCreateWithoutProcessedByInput, Prisma.ReturnUncheckedCreateWithoutProcessedByInput>;
};
export type ReturnUpdateWithWhereUniqueWithoutProcessedByInput = {
    where: Prisma.ReturnWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReturnUpdateWithoutProcessedByInput, Prisma.ReturnUncheckedUpdateWithoutProcessedByInput>;
};
export type ReturnUpdateManyWithWhereWithoutProcessedByInput = {
    where: Prisma.ReturnScalarWhereInput;
    data: Prisma.XOR<Prisma.ReturnUpdateManyMutationInput, Prisma.ReturnUncheckedUpdateManyWithoutProcessedByInput>;
};
export type ReturnScalarWhereInput = {
    AND?: Prisma.ReturnScalarWhereInput | Prisma.ReturnScalarWhereInput[];
    OR?: Prisma.ReturnScalarWhereInput[];
    NOT?: Prisma.ReturnScalarWhereInput | Prisma.ReturnScalarWhereInput[];
    id?: Prisma.StringFilter<"Return"> | string;
    shopId?: Prisma.StringFilter<"Return"> | string;
    returnNumber?: Prisma.StringFilter<"Return"> | string;
    saleId?: Prisma.StringFilter<"Return"> | string;
    customerId?: Prisma.StringNullableFilter<"Return"> | string | null;
    processedById?: Prisma.StringFilter<"Return"> | string;
    reason?: Prisma.StringFilter<"Return"> | string;
    notes?: Prisma.StringNullableFilter<"Return"> | string | null;
    refundAmount?: Prisma.DecimalFilter<"Return"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFilter<"Return"> | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFilter<"Return"> | boolean;
    returnDate?: Prisma.DateTimeFilter<"Return"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Return"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Return"> | Date | string;
};
export type ReturnCreateWithoutShopInput = {
    id?: string;
    returnNumber: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sale: Prisma.SaleCreateNestedOneWithoutReturnsInput;
    customer?: Prisma.CustomerCreateNestedOneWithoutReturnsInput;
    processedBy: Prisma.UserCreateNestedOneWithoutReturnsInput;
    items?: Prisma.ReturnItemCreateNestedManyWithoutReturnInput;
};
export type ReturnUncheckedCreateWithoutShopInput = {
    id?: string;
    returnNumber: string;
    saleId: string;
    customerId?: string | null;
    processedById: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.ReturnItemUncheckedCreateNestedManyWithoutReturnInput;
};
export type ReturnCreateOrConnectWithoutShopInput = {
    where: Prisma.ReturnWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReturnCreateWithoutShopInput, Prisma.ReturnUncheckedCreateWithoutShopInput>;
};
export type ReturnCreateManyShopInputEnvelope = {
    data: Prisma.ReturnCreateManyShopInput | Prisma.ReturnCreateManyShopInput[];
    skipDuplicates?: boolean;
};
export type ReturnUpsertWithWhereUniqueWithoutShopInput = {
    where: Prisma.ReturnWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReturnUpdateWithoutShopInput, Prisma.ReturnUncheckedUpdateWithoutShopInput>;
    create: Prisma.XOR<Prisma.ReturnCreateWithoutShopInput, Prisma.ReturnUncheckedCreateWithoutShopInput>;
};
export type ReturnUpdateWithWhereUniqueWithoutShopInput = {
    where: Prisma.ReturnWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReturnUpdateWithoutShopInput, Prisma.ReturnUncheckedUpdateWithoutShopInput>;
};
export type ReturnUpdateManyWithWhereWithoutShopInput = {
    where: Prisma.ReturnScalarWhereInput;
    data: Prisma.XOR<Prisma.ReturnUpdateManyMutationInput, Prisma.ReturnUncheckedUpdateManyWithoutShopInput>;
};
export type ReturnCreateWithoutCustomerInput = {
    id?: string;
    returnNumber: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutReturnsInput;
    sale: Prisma.SaleCreateNestedOneWithoutReturnsInput;
    processedBy: Prisma.UserCreateNestedOneWithoutReturnsInput;
    items?: Prisma.ReturnItemCreateNestedManyWithoutReturnInput;
};
export type ReturnUncheckedCreateWithoutCustomerInput = {
    id?: string;
    shopId: string;
    returnNumber: string;
    saleId: string;
    processedById: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.ReturnItemUncheckedCreateNestedManyWithoutReturnInput;
};
export type ReturnCreateOrConnectWithoutCustomerInput = {
    where: Prisma.ReturnWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReturnCreateWithoutCustomerInput, Prisma.ReturnUncheckedCreateWithoutCustomerInput>;
};
export type ReturnCreateManyCustomerInputEnvelope = {
    data: Prisma.ReturnCreateManyCustomerInput | Prisma.ReturnCreateManyCustomerInput[];
    skipDuplicates?: boolean;
};
export type ReturnUpsertWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.ReturnWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReturnUpdateWithoutCustomerInput, Prisma.ReturnUncheckedUpdateWithoutCustomerInput>;
    create: Prisma.XOR<Prisma.ReturnCreateWithoutCustomerInput, Prisma.ReturnUncheckedCreateWithoutCustomerInput>;
};
export type ReturnUpdateWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.ReturnWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReturnUpdateWithoutCustomerInput, Prisma.ReturnUncheckedUpdateWithoutCustomerInput>;
};
export type ReturnUpdateManyWithWhereWithoutCustomerInput = {
    where: Prisma.ReturnScalarWhereInput;
    data: Prisma.XOR<Prisma.ReturnUpdateManyMutationInput, Prisma.ReturnUncheckedUpdateManyWithoutCustomerInput>;
};
export type ReturnCreateWithoutSaleInput = {
    id?: string;
    returnNumber: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutReturnsInput;
    customer?: Prisma.CustomerCreateNestedOneWithoutReturnsInput;
    processedBy: Prisma.UserCreateNestedOneWithoutReturnsInput;
    items?: Prisma.ReturnItemCreateNestedManyWithoutReturnInput;
};
export type ReturnUncheckedCreateWithoutSaleInput = {
    id?: string;
    shopId: string;
    returnNumber: string;
    customerId?: string | null;
    processedById: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.ReturnItemUncheckedCreateNestedManyWithoutReturnInput;
};
export type ReturnCreateOrConnectWithoutSaleInput = {
    where: Prisma.ReturnWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReturnCreateWithoutSaleInput, Prisma.ReturnUncheckedCreateWithoutSaleInput>;
};
export type ReturnCreateManySaleInputEnvelope = {
    data: Prisma.ReturnCreateManySaleInput | Prisma.ReturnCreateManySaleInput[];
    skipDuplicates?: boolean;
};
export type ReturnUpsertWithWhereUniqueWithoutSaleInput = {
    where: Prisma.ReturnWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReturnUpdateWithoutSaleInput, Prisma.ReturnUncheckedUpdateWithoutSaleInput>;
    create: Prisma.XOR<Prisma.ReturnCreateWithoutSaleInput, Prisma.ReturnUncheckedCreateWithoutSaleInput>;
};
export type ReturnUpdateWithWhereUniqueWithoutSaleInput = {
    where: Prisma.ReturnWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReturnUpdateWithoutSaleInput, Prisma.ReturnUncheckedUpdateWithoutSaleInput>;
};
export type ReturnUpdateManyWithWhereWithoutSaleInput = {
    where: Prisma.ReturnScalarWhereInput;
    data: Prisma.XOR<Prisma.ReturnUpdateManyMutationInput, Prisma.ReturnUncheckedUpdateManyWithoutSaleInput>;
};
export type ReturnCreateWithoutItemsInput = {
    id?: string;
    returnNumber: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutReturnsInput;
    sale: Prisma.SaleCreateNestedOneWithoutReturnsInput;
    customer?: Prisma.CustomerCreateNestedOneWithoutReturnsInput;
    processedBy: Prisma.UserCreateNestedOneWithoutReturnsInput;
};
export type ReturnUncheckedCreateWithoutItemsInput = {
    id?: string;
    shopId: string;
    returnNumber: string;
    saleId: string;
    customerId?: string | null;
    processedById: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReturnCreateOrConnectWithoutItemsInput = {
    where: Prisma.ReturnWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReturnCreateWithoutItemsInput, Prisma.ReturnUncheckedCreateWithoutItemsInput>;
};
export type ReturnUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.ReturnUpdateWithoutItemsInput, Prisma.ReturnUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.ReturnCreateWithoutItemsInput, Prisma.ReturnUncheckedCreateWithoutItemsInput>;
    where?: Prisma.ReturnWhereInput;
};
export type ReturnUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.ReturnWhereInput;
    data: Prisma.XOR<Prisma.ReturnUpdateWithoutItemsInput, Prisma.ReturnUncheckedUpdateWithoutItemsInput>;
};
export type ReturnUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutReturnsNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutReturnsNestedInput;
    customer?: Prisma.CustomerUpdateOneWithoutReturnsNestedInput;
    processedBy?: Prisma.UserUpdateOneRequiredWithoutReturnsNestedInput;
};
export type ReturnUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    processedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnCreateManyProcessedByInput = {
    id?: string;
    shopId: string;
    returnNumber: string;
    saleId: string;
    customerId?: string | null;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReturnUpdateWithoutProcessedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutReturnsNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutReturnsNestedInput;
    customer?: Prisma.CustomerUpdateOneWithoutReturnsNestedInput;
    items?: Prisma.ReturnItemUpdateManyWithoutReturnNestedInput;
};
export type ReturnUncheckedUpdateWithoutProcessedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.ReturnItemUncheckedUpdateManyWithoutReturnNestedInput;
};
export type ReturnUncheckedUpdateManyWithoutProcessedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnCreateManyShopInput = {
    id?: string;
    returnNumber: string;
    saleId: string;
    customerId?: string | null;
    processedById: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReturnUpdateWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sale?: Prisma.SaleUpdateOneRequiredWithoutReturnsNestedInput;
    customer?: Prisma.CustomerUpdateOneWithoutReturnsNestedInput;
    processedBy?: Prisma.UserUpdateOneRequiredWithoutReturnsNestedInput;
    items?: Prisma.ReturnItemUpdateManyWithoutReturnNestedInput;
};
export type ReturnUncheckedUpdateWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    processedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.ReturnItemUncheckedUpdateManyWithoutReturnNestedInput;
};
export type ReturnUncheckedUpdateManyWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    processedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnCreateManyCustomerInput = {
    id?: string;
    shopId: string;
    returnNumber: string;
    saleId: string;
    processedById: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReturnUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutReturnsNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutReturnsNestedInput;
    processedBy?: Prisma.UserUpdateOneRequiredWithoutReturnsNestedInput;
    items?: Prisma.ReturnItemUpdateManyWithoutReturnNestedInput;
};
export type ReturnUncheckedUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    processedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.ReturnItemUncheckedUpdateManyWithoutReturnNestedInput;
};
export type ReturnUncheckedUpdateManyWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    processedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnCreateManySaleInput = {
    id?: string;
    shopId: string;
    returnNumber: string;
    customerId?: string | null;
    processedById: string;
    reason: string;
    notes?: string | null;
    refundAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: $Enums.PaymentMethod;
    restockItems?: boolean;
    returnDate?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReturnUpdateWithoutSaleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutReturnsNestedInput;
    customer?: Prisma.CustomerUpdateOneWithoutReturnsNestedInput;
    processedBy?: Prisma.UserUpdateOneRequiredWithoutReturnsNestedInput;
    items?: Prisma.ReturnItemUpdateManyWithoutReturnNestedInput;
};
export type ReturnUncheckedUpdateWithoutSaleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    processedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.ReturnItemUncheckedUpdateManyWithoutReturnNestedInput;
};
export type ReturnUncheckedUpdateManyWithoutSaleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    returnNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    processedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    refundMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    restockItems?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    returnDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnCountOutputType = {
    items: number;
};
export type ReturnCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | ReturnCountOutputTypeCountItemsArgs;
};
export type ReturnCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnCountOutputTypeSelect<ExtArgs> | null;
};
export type ReturnCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReturnItemWhereInput;
};
export type ReturnSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    returnNumber?: boolean;
    saleId?: boolean;
    customerId?: boolean;
    processedById?: boolean;
    reason?: boolean;
    notes?: boolean;
    refundAmount?: boolean;
    refundMethod?: boolean;
    restockItems?: boolean;
    returnDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.Return$customerArgs<ExtArgs>;
    processedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.Return$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.ReturnCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["return"]>;
export type ReturnSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    returnNumber?: boolean;
    saleId?: boolean;
    customerId?: boolean;
    processedById?: boolean;
    reason?: boolean;
    notes?: boolean;
    refundAmount?: boolean;
    refundMethod?: boolean;
    restockItems?: boolean;
    returnDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.Return$customerArgs<ExtArgs>;
    processedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["return"]>;
export type ReturnSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    returnNumber?: boolean;
    saleId?: boolean;
    customerId?: boolean;
    processedById?: boolean;
    reason?: boolean;
    notes?: boolean;
    refundAmount?: boolean;
    refundMethod?: boolean;
    restockItems?: boolean;
    returnDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.Return$customerArgs<ExtArgs>;
    processedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["return"]>;
export type ReturnSelectScalar = {
    id?: boolean;
    shopId?: boolean;
    returnNumber?: boolean;
    saleId?: boolean;
    customerId?: boolean;
    processedById?: boolean;
    reason?: boolean;
    notes?: boolean;
    refundAmount?: boolean;
    refundMethod?: boolean;
    restockItems?: boolean;
    returnDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ReturnOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "shopId" | "returnNumber" | "saleId" | "customerId" | "processedById" | "reason" | "notes" | "refundAmount" | "refundMethod" | "restockItems" | "returnDate" | "createdAt" | "updatedAt", ExtArgs["result"]["return"]>;
export type ReturnInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.Return$customerArgs<ExtArgs>;
    processedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.Return$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.ReturnCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ReturnIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.Return$customerArgs<ExtArgs>;
    processedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ReturnIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.Return$customerArgs<ExtArgs>;
    processedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ReturnPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Return";
    objects: {
        shop: Prisma.$ShopPayload<ExtArgs>;
        sale: Prisma.$SalePayload<ExtArgs>;
        customer: Prisma.$CustomerPayload<ExtArgs> | null;
        processedBy: Prisma.$UserPayload<ExtArgs>;
        items: Prisma.$ReturnItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        shopId: string;
        returnNumber: string;
        saleId: string;
        customerId: string | null;
        processedById: string;
        reason: string;
        notes: string | null;
        refundAmount: runtime.Decimal;
        refundMethod: $Enums.PaymentMethod;
        restockItems: boolean;
        returnDate: Date;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["return"]>;
    composites: {};
};
export type ReturnGetPayload<S extends boolean | null | undefined | ReturnDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReturnPayload, S>;
export type ReturnCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReturnFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReturnCountAggregateInputType | true;
};
export interface ReturnDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Return'];
        meta: {
            name: 'Return';
        };
    };
    findUnique<T extends ReturnFindUniqueArgs>(args: Prisma.SelectSubset<T, ReturnFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReturnClient<runtime.Types.Result.GetResult<Prisma.$ReturnPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReturnFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReturnFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReturnClient<runtime.Types.Result.GetResult<Prisma.$ReturnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReturnFindFirstArgs>(args?: Prisma.SelectSubset<T, ReturnFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReturnClient<runtime.Types.Result.GetResult<Prisma.$ReturnPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReturnFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReturnFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReturnClient<runtime.Types.Result.GetResult<Prisma.$ReturnPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReturnFindManyArgs>(args?: Prisma.SelectSubset<T, ReturnFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReturnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReturnCreateArgs>(args: Prisma.SelectSubset<T, ReturnCreateArgs<ExtArgs>>): Prisma.Prisma__ReturnClient<runtime.Types.Result.GetResult<Prisma.$ReturnPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReturnCreateManyArgs>(args?: Prisma.SelectSubset<T, ReturnCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReturnCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReturnCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReturnPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReturnDeleteArgs>(args: Prisma.SelectSubset<T, ReturnDeleteArgs<ExtArgs>>): Prisma.Prisma__ReturnClient<runtime.Types.Result.GetResult<Prisma.$ReturnPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReturnUpdateArgs>(args: Prisma.SelectSubset<T, ReturnUpdateArgs<ExtArgs>>): Prisma.Prisma__ReturnClient<runtime.Types.Result.GetResult<Prisma.$ReturnPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReturnDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReturnDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReturnUpdateManyArgs>(args: Prisma.SelectSubset<T, ReturnUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReturnUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReturnUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReturnPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReturnUpsertArgs>(args: Prisma.SelectSubset<T, ReturnUpsertArgs<ExtArgs>>): Prisma.Prisma__ReturnClient<runtime.Types.Result.GetResult<Prisma.$ReturnPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReturnCountArgs>(args?: Prisma.Subset<T, ReturnCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReturnCountAggregateOutputType> : number>;
    aggregate<T extends ReturnAggregateArgs>(args: Prisma.Subset<T, ReturnAggregateArgs>): Prisma.PrismaPromise<GetReturnAggregateType<T>>;
    groupBy<T extends ReturnGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReturnGroupByArgs['orderBy'];
    } : {
        orderBy?: ReturnGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReturnGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReturnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReturnFieldRefs;
}
export interface Prisma__ReturnClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    shop<T extends Prisma.ShopDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShopDefaultArgs<ExtArgs>>): Prisma.Prisma__ShopClient<runtime.Types.Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    sale<T extends Prisma.SaleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleDefaultArgs<ExtArgs>>): Prisma.Prisma__SaleClient<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    customer<T extends Prisma.Return$customerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Return$customerArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    processedBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.Return$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Return$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReturnFieldRefs {
    readonly id: Prisma.FieldRef<"Return", 'String'>;
    readonly shopId: Prisma.FieldRef<"Return", 'String'>;
    readonly returnNumber: Prisma.FieldRef<"Return", 'String'>;
    readonly saleId: Prisma.FieldRef<"Return", 'String'>;
    readonly customerId: Prisma.FieldRef<"Return", 'String'>;
    readonly processedById: Prisma.FieldRef<"Return", 'String'>;
    readonly reason: Prisma.FieldRef<"Return", 'String'>;
    readonly notes: Prisma.FieldRef<"Return", 'String'>;
    readonly refundAmount: Prisma.FieldRef<"Return", 'Decimal'>;
    readonly refundMethod: Prisma.FieldRef<"Return", 'PaymentMethod'>;
    readonly restockItems: Prisma.FieldRef<"Return", 'Boolean'>;
    readonly returnDate: Prisma.FieldRef<"Return", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Return", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Return", 'DateTime'>;
}
export type ReturnFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnSelect<ExtArgs> | null;
    omit?: Prisma.ReturnOmit<ExtArgs> | null;
    include?: Prisma.ReturnInclude<ExtArgs> | null;
    where: Prisma.ReturnWhereUniqueInput;
};
export type ReturnFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnSelect<ExtArgs> | null;
    omit?: Prisma.ReturnOmit<ExtArgs> | null;
    include?: Prisma.ReturnInclude<ExtArgs> | null;
    where: Prisma.ReturnWhereUniqueInput;
};
export type ReturnFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnSelect<ExtArgs> | null;
    omit?: Prisma.ReturnOmit<ExtArgs> | null;
    include?: Prisma.ReturnInclude<ExtArgs> | null;
    where?: Prisma.ReturnWhereInput;
    orderBy?: Prisma.ReturnOrderByWithRelationInput | Prisma.ReturnOrderByWithRelationInput[];
    cursor?: Prisma.ReturnWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReturnScalarFieldEnum | Prisma.ReturnScalarFieldEnum[];
};
export type ReturnFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnSelect<ExtArgs> | null;
    omit?: Prisma.ReturnOmit<ExtArgs> | null;
    include?: Prisma.ReturnInclude<ExtArgs> | null;
    where?: Prisma.ReturnWhereInput;
    orderBy?: Prisma.ReturnOrderByWithRelationInput | Prisma.ReturnOrderByWithRelationInput[];
    cursor?: Prisma.ReturnWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReturnScalarFieldEnum | Prisma.ReturnScalarFieldEnum[];
};
export type ReturnFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnSelect<ExtArgs> | null;
    omit?: Prisma.ReturnOmit<ExtArgs> | null;
    include?: Prisma.ReturnInclude<ExtArgs> | null;
    where?: Prisma.ReturnWhereInput;
    orderBy?: Prisma.ReturnOrderByWithRelationInput | Prisma.ReturnOrderByWithRelationInput[];
    cursor?: Prisma.ReturnWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReturnScalarFieldEnum | Prisma.ReturnScalarFieldEnum[];
};
export type ReturnCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnSelect<ExtArgs> | null;
    omit?: Prisma.ReturnOmit<ExtArgs> | null;
    include?: Prisma.ReturnInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReturnCreateInput, Prisma.ReturnUncheckedCreateInput>;
};
export type ReturnCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReturnCreateManyInput | Prisma.ReturnCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReturnCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReturnOmit<ExtArgs> | null;
    data: Prisma.ReturnCreateManyInput | Prisma.ReturnCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReturnIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReturnUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnSelect<ExtArgs> | null;
    omit?: Prisma.ReturnOmit<ExtArgs> | null;
    include?: Prisma.ReturnInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReturnUpdateInput, Prisma.ReturnUncheckedUpdateInput>;
    where: Prisma.ReturnWhereUniqueInput;
};
export type ReturnUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReturnUpdateManyMutationInput, Prisma.ReturnUncheckedUpdateManyInput>;
    where?: Prisma.ReturnWhereInput;
    limit?: number;
};
export type ReturnUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReturnOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReturnUpdateManyMutationInput, Prisma.ReturnUncheckedUpdateManyInput>;
    where?: Prisma.ReturnWhereInput;
    limit?: number;
    include?: Prisma.ReturnIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReturnUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnSelect<ExtArgs> | null;
    omit?: Prisma.ReturnOmit<ExtArgs> | null;
    include?: Prisma.ReturnInclude<ExtArgs> | null;
    where: Prisma.ReturnWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReturnCreateInput, Prisma.ReturnUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReturnUpdateInput, Prisma.ReturnUncheckedUpdateInput>;
};
export type ReturnDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnSelect<ExtArgs> | null;
    omit?: Prisma.ReturnOmit<ExtArgs> | null;
    include?: Prisma.ReturnInclude<ExtArgs> | null;
    where: Prisma.ReturnWhereUniqueInput;
};
export type ReturnDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReturnWhereInput;
    limit?: number;
};
export type Return$customerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where?: Prisma.CustomerWhereInput;
};
export type Return$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.ReturnItemOmit<ExtArgs> | null;
    include?: Prisma.ReturnItemInclude<ExtArgs> | null;
    where?: Prisma.ReturnItemWhereInput;
    orderBy?: Prisma.ReturnItemOrderByWithRelationInput | Prisma.ReturnItemOrderByWithRelationInput[];
    cursor?: Prisma.ReturnItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReturnItemScalarFieldEnum | Prisma.ReturnItemScalarFieldEnum[];
};
export type ReturnDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnSelect<ExtArgs> | null;
    omit?: Prisma.ReturnOmit<ExtArgs> | null;
    include?: Prisma.ReturnInclude<ExtArgs> | null;
};
