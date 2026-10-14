import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EmailLogModel = runtime.Types.Result.DefaultSelection<Prisma.$EmailLogPayload>;
export type AggregateEmailLog = {
    _count: EmailLogCountAggregateOutputType | null;
    _min: EmailLogMinAggregateOutputType | null;
    _max: EmailLogMaxAggregateOutputType | null;
};
export type EmailLogMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.EmailType | null;
    status: $Enums.EmailStatus | null;
    toEmail: string | null;
    fromEmail: string | null;
    subject: string | null;
    bodyPreview: string | null;
    messageId: string | null;
    error: string | null;
    sentAt: Date | null;
    createdAt: Date | null;
};
export type EmailLogMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.EmailType | null;
    status: $Enums.EmailStatus | null;
    toEmail: string | null;
    fromEmail: string | null;
    subject: string | null;
    bodyPreview: string | null;
    messageId: string | null;
    error: string | null;
    sentAt: Date | null;
    createdAt: Date | null;
};
export type EmailLogCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    status: number;
    toEmail: number;
    fromEmail: number;
    subject: number;
    bodyPreview: number;
    messageId: number;
    error: number;
    sentAt: number;
    createdAt: number;
    _all: number;
};
export type EmailLogMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    status?: true;
    toEmail?: true;
    fromEmail?: true;
    subject?: true;
    bodyPreview?: true;
    messageId?: true;
    error?: true;
    sentAt?: true;
    createdAt?: true;
};
export type EmailLogMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    status?: true;
    toEmail?: true;
    fromEmail?: true;
    subject?: true;
    bodyPreview?: true;
    messageId?: true;
    error?: true;
    sentAt?: true;
    createdAt?: true;
};
export type EmailLogCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    status?: true;
    toEmail?: true;
    fromEmail?: true;
    subject?: true;
    bodyPreview?: true;
    messageId?: true;
    error?: true;
    sentAt?: true;
    createdAt?: true;
    _all?: true;
};
export type EmailLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailLogWhereInput;
    orderBy?: Prisma.EmailLogOrderByWithRelationInput | Prisma.EmailLogOrderByWithRelationInput[];
    cursor?: Prisma.EmailLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EmailLogCountAggregateInputType;
    _min?: EmailLogMinAggregateInputType;
    _max?: EmailLogMaxAggregateInputType;
};
export type GetEmailLogAggregateType<T extends EmailLogAggregateArgs> = {
    [P in keyof T & keyof AggregateEmailLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEmailLog[P]> : Prisma.GetScalarType<T[P], AggregateEmailLog[P]>;
};
export type EmailLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailLogWhereInput;
    orderBy?: Prisma.EmailLogOrderByWithAggregationInput | Prisma.EmailLogOrderByWithAggregationInput[];
    by: Prisma.EmailLogScalarFieldEnum[] | Prisma.EmailLogScalarFieldEnum;
    having?: Prisma.EmailLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EmailLogCountAggregateInputType | true;
    _min?: EmailLogMinAggregateInputType;
    _max?: EmailLogMaxAggregateInputType;
};
export type EmailLogGroupByOutputType = {
    id: string;
    userId: string | null;
    type: $Enums.EmailType;
    status: $Enums.EmailStatus;
    toEmail: string;
    fromEmail: string;
    subject: string;
    bodyPreview: string | null;
    messageId: string | null;
    error: string | null;
    sentAt: Date | null;
    createdAt: Date;
    _count: EmailLogCountAggregateOutputType | null;
    _min: EmailLogMinAggregateOutputType | null;
    _max: EmailLogMaxAggregateOutputType | null;
};
export type GetEmailLogGroupByPayload<T extends EmailLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EmailLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EmailLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EmailLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EmailLogGroupByOutputType[P]>;
}>>;
export type EmailLogWhereInput = {
    AND?: Prisma.EmailLogWhereInput | Prisma.EmailLogWhereInput[];
    OR?: Prisma.EmailLogWhereInput[];
    NOT?: Prisma.EmailLogWhereInput | Prisma.EmailLogWhereInput[];
    id?: Prisma.StringFilter<"EmailLog"> | string;
    userId?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    type?: Prisma.EnumEmailTypeFilter<"EmailLog"> | $Enums.EmailType;
    status?: Prisma.EnumEmailStatusFilter<"EmailLog"> | $Enums.EmailStatus;
    toEmail?: Prisma.StringFilter<"EmailLog"> | string;
    fromEmail?: Prisma.StringFilter<"EmailLog"> | string;
    subject?: Prisma.StringFilter<"EmailLog"> | string;
    bodyPreview?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    messageId?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    error?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    sentAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"EmailLog"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type EmailLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    toEmail?: Prisma.SortOrder;
    fromEmail?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    bodyPreview?: Prisma.SortOrderInput | Prisma.SortOrder;
    messageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    sentAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type EmailLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.EmailLogWhereInput | Prisma.EmailLogWhereInput[];
    OR?: Prisma.EmailLogWhereInput[];
    NOT?: Prisma.EmailLogWhereInput | Prisma.EmailLogWhereInput[];
    userId?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    type?: Prisma.EnumEmailTypeFilter<"EmailLog"> | $Enums.EmailType;
    status?: Prisma.EnumEmailStatusFilter<"EmailLog"> | $Enums.EmailStatus;
    toEmail?: Prisma.StringFilter<"EmailLog"> | string;
    fromEmail?: Prisma.StringFilter<"EmailLog"> | string;
    subject?: Prisma.StringFilter<"EmailLog"> | string;
    bodyPreview?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    messageId?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    error?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    sentAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"EmailLog"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type EmailLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    toEmail?: Prisma.SortOrder;
    fromEmail?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    bodyPreview?: Prisma.SortOrderInput | Prisma.SortOrder;
    messageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    sentAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.EmailLogCountOrderByAggregateInput;
    _max?: Prisma.EmailLogMaxOrderByAggregateInput;
    _min?: Prisma.EmailLogMinOrderByAggregateInput;
};
export type EmailLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.EmailLogScalarWhereWithAggregatesInput | Prisma.EmailLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.EmailLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EmailLogScalarWhereWithAggregatesInput | Prisma.EmailLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"EmailLog"> | string;
    userId?: Prisma.StringNullableWithAggregatesFilter<"EmailLog"> | string | null;
    type?: Prisma.EnumEmailTypeWithAggregatesFilter<"EmailLog"> | $Enums.EmailType;
    status?: Prisma.EnumEmailStatusWithAggregatesFilter<"EmailLog"> | $Enums.EmailStatus;
    toEmail?: Prisma.StringWithAggregatesFilter<"EmailLog"> | string;
    fromEmail?: Prisma.StringWithAggregatesFilter<"EmailLog"> | string;
    subject?: Prisma.StringWithAggregatesFilter<"EmailLog"> | string;
    bodyPreview?: Prisma.StringNullableWithAggregatesFilter<"EmailLog"> | string | null;
    messageId?: Prisma.StringNullableWithAggregatesFilter<"EmailLog"> | string | null;
    error?: Prisma.StringNullableWithAggregatesFilter<"EmailLog"> | string | null;
    sentAt?: Prisma.DateTimeNullableWithAggregatesFilter<"EmailLog"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"EmailLog"> | Date | string;
};
export type EmailLogCreateInput = {
    id?: string;
    type: $Enums.EmailType;
    status?: $Enums.EmailStatus;
    toEmail: string;
    fromEmail: string;
    subject: string;
    bodyPreview?: string | null;
    messageId?: string | null;
    error?: string | null;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutEmailLogsInput;
};
export type EmailLogUncheckedCreateInput = {
    id?: string;
    userId?: string | null;
    type: $Enums.EmailType;
    status?: $Enums.EmailStatus;
    toEmail: string;
    fromEmail: string;
    subject: string;
    bodyPreview?: string | null;
    messageId?: string | null;
    error?: string | null;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type EmailLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEmailTypeFieldUpdateOperationsInput | $Enums.EmailType;
    status?: Prisma.EnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus;
    toEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    fromEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    bodyPreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutEmailLogsNestedInput;
};
export type EmailLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumEmailTypeFieldUpdateOperationsInput | $Enums.EmailType;
    status?: Prisma.EnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus;
    toEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    fromEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    bodyPreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailLogCreateManyInput = {
    id?: string;
    userId?: string | null;
    type: $Enums.EmailType;
    status?: $Enums.EmailStatus;
    toEmail: string;
    fromEmail: string;
    subject: string;
    bodyPreview?: string | null;
    messageId?: string | null;
    error?: string | null;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type EmailLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEmailTypeFieldUpdateOperationsInput | $Enums.EmailType;
    status?: Prisma.EnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus;
    toEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    fromEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    bodyPreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumEmailTypeFieldUpdateOperationsInput | $Enums.EmailType;
    status?: Prisma.EnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus;
    toEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    fromEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    bodyPreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailLogListRelationFilter = {
    every?: Prisma.EmailLogWhereInput;
    some?: Prisma.EmailLogWhereInput;
    none?: Prisma.EmailLogWhereInput;
};
export type EmailLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EmailLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    toEmail?: Prisma.SortOrder;
    fromEmail?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    bodyPreview?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EmailLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    toEmail?: Prisma.SortOrder;
    fromEmail?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    bodyPreview?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EmailLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    toEmail?: Prisma.SortOrder;
    fromEmail?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    bodyPreview?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EmailLogCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.EmailLogCreateWithoutUserInput, Prisma.EmailLogUncheckedCreateWithoutUserInput> | Prisma.EmailLogCreateWithoutUserInput[] | Prisma.EmailLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EmailLogCreateOrConnectWithoutUserInput | Prisma.EmailLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.EmailLogCreateManyUserInputEnvelope;
    connect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
};
export type EmailLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.EmailLogCreateWithoutUserInput, Prisma.EmailLogUncheckedCreateWithoutUserInput> | Prisma.EmailLogCreateWithoutUserInput[] | Prisma.EmailLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EmailLogCreateOrConnectWithoutUserInput | Prisma.EmailLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.EmailLogCreateManyUserInputEnvelope;
    connect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
};
export type EmailLogUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.EmailLogCreateWithoutUserInput, Prisma.EmailLogUncheckedCreateWithoutUserInput> | Prisma.EmailLogCreateWithoutUserInput[] | Prisma.EmailLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EmailLogCreateOrConnectWithoutUserInput | Prisma.EmailLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.EmailLogUpsertWithWhereUniqueWithoutUserInput | Prisma.EmailLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.EmailLogCreateManyUserInputEnvelope;
    set?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    disconnect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    delete?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    connect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    update?: Prisma.EmailLogUpdateWithWhereUniqueWithoutUserInput | Prisma.EmailLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.EmailLogUpdateManyWithWhereWithoutUserInput | Prisma.EmailLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.EmailLogScalarWhereInput | Prisma.EmailLogScalarWhereInput[];
};
export type EmailLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.EmailLogCreateWithoutUserInput, Prisma.EmailLogUncheckedCreateWithoutUserInput> | Prisma.EmailLogCreateWithoutUserInput[] | Prisma.EmailLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EmailLogCreateOrConnectWithoutUserInput | Prisma.EmailLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.EmailLogUpsertWithWhereUniqueWithoutUserInput | Prisma.EmailLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.EmailLogCreateManyUserInputEnvelope;
    set?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    disconnect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    delete?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    connect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    update?: Prisma.EmailLogUpdateWithWhereUniqueWithoutUserInput | Prisma.EmailLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.EmailLogUpdateManyWithWhereWithoutUserInput | Prisma.EmailLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.EmailLogScalarWhereInput | Prisma.EmailLogScalarWhereInput[];
};
export type EnumEmailTypeFieldUpdateOperationsInput = {
    set?: $Enums.EmailType;
};
export type EnumEmailStatusFieldUpdateOperationsInput = {
    set?: $Enums.EmailStatus;
};
export type EmailLogCreateWithoutUserInput = {
    id?: string;
    type: $Enums.EmailType;
    status?: $Enums.EmailStatus;
    toEmail: string;
    fromEmail: string;
    subject: string;
    bodyPreview?: string | null;
    messageId?: string | null;
    error?: string | null;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type EmailLogUncheckedCreateWithoutUserInput = {
    id?: string;
    type: $Enums.EmailType;
    status?: $Enums.EmailStatus;
    toEmail: string;
    fromEmail: string;
    subject: string;
    bodyPreview?: string | null;
    messageId?: string | null;
    error?: string | null;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type EmailLogCreateOrConnectWithoutUserInput = {
    where: Prisma.EmailLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmailLogCreateWithoutUserInput, Prisma.EmailLogUncheckedCreateWithoutUserInput>;
};
export type EmailLogCreateManyUserInputEnvelope = {
    data: Prisma.EmailLogCreateManyUserInput | Prisma.EmailLogCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type EmailLogUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.EmailLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.EmailLogUpdateWithoutUserInput, Prisma.EmailLogUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.EmailLogCreateWithoutUserInput, Prisma.EmailLogUncheckedCreateWithoutUserInput>;
};
export type EmailLogUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.EmailLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.EmailLogUpdateWithoutUserInput, Prisma.EmailLogUncheckedUpdateWithoutUserInput>;
};
export type EmailLogUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.EmailLogScalarWhereInput;
    data: Prisma.XOR<Prisma.EmailLogUpdateManyMutationInput, Prisma.EmailLogUncheckedUpdateManyWithoutUserInput>;
};
export type EmailLogScalarWhereInput = {
    AND?: Prisma.EmailLogScalarWhereInput | Prisma.EmailLogScalarWhereInput[];
    OR?: Prisma.EmailLogScalarWhereInput[];
    NOT?: Prisma.EmailLogScalarWhereInput | Prisma.EmailLogScalarWhereInput[];
    id?: Prisma.StringFilter<"EmailLog"> | string;
    userId?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    type?: Prisma.EnumEmailTypeFilter<"EmailLog"> | $Enums.EmailType;
    status?: Prisma.EnumEmailStatusFilter<"EmailLog"> | $Enums.EmailStatus;
    toEmail?: Prisma.StringFilter<"EmailLog"> | string;
    fromEmail?: Prisma.StringFilter<"EmailLog"> | string;
    subject?: Prisma.StringFilter<"EmailLog"> | string;
    bodyPreview?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    messageId?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    error?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    sentAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"EmailLog"> | Date | string;
};
export type EmailLogCreateManyUserInput = {
    id?: string;
    type: $Enums.EmailType;
    status?: $Enums.EmailStatus;
    toEmail: string;
    fromEmail: string;
    subject: string;
    bodyPreview?: string | null;
    messageId?: string | null;
    error?: string | null;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type EmailLogUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEmailTypeFieldUpdateOperationsInput | $Enums.EmailType;
    status?: Prisma.EnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus;
    toEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    fromEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    bodyPreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailLogUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEmailTypeFieldUpdateOperationsInput | $Enums.EmailType;
    status?: Prisma.EnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus;
    toEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    fromEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    bodyPreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailLogUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEmailTypeFieldUpdateOperationsInput | $Enums.EmailType;
    status?: Prisma.EnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus;
    toEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    fromEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    bodyPreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    status?: boolean;
    toEmail?: boolean;
    fromEmail?: boolean;
    subject?: boolean;
    bodyPreview?: boolean;
    messageId?: boolean;
    error?: boolean;
    sentAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.EmailLog$userArgs<ExtArgs>;
}, ExtArgs["result"]["emailLog"]>;
export type EmailLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    status?: boolean;
    toEmail?: boolean;
    fromEmail?: boolean;
    subject?: boolean;
    bodyPreview?: boolean;
    messageId?: boolean;
    error?: boolean;
    sentAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.EmailLog$userArgs<ExtArgs>;
}, ExtArgs["result"]["emailLog"]>;
export type EmailLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    status?: boolean;
    toEmail?: boolean;
    fromEmail?: boolean;
    subject?: boolean;
    bodyPreview?: boolean;
    messageId?: boolean;
    error?: boolean;
    sentAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.EmailLog$userArgs<ExtArgs>;
}, ExtArgs["result"]["emailLog"]>;
export type EmailLogSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    status?: boolean;
    toEmail?: boolean;
    fromEmail?: boolean;
    subject?: boolean;
    bodyPreview?: boolean;
    messageId?: boolean;
    error?: boolean;
    sentAt?: boolean;
    createdAt?: boolean;
};
export type EmailLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "status" | "toEmail" | "fromEmail" | "subject" | "bodyPreview" | "messageId" | "error" | "sentAt" | "createdAt", ExtArgs["result"]["emailLog"]>;
export type EmailLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.EmailLog$userArgs<ExtArgs>;
};
export type EmailLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.EmailLog$userArgs<ExtArgs>;
};
export type EmailLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.EmailLog$userArgs<ExtArgs>;
};
export type $EmailLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EmailLog";
    objects: {
        user: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string | null;
        type: $Enums.EmailType;
        status: $Enums.EmailStatus;
        toEmail: string;
        fromEmail: string;
        subject: string;
        bodyPreview: string | null;
        messageId: string | null;
        error: string | null;
        sentAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["emailLog"]>;
    composites: {};
};
export type EmailLogGetPayload<S extends boolean | null | undefined | EmailLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EmailLogPayload, S>;
export type EmailLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EmailLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EmailLogCountAggregateInputType | true;
};
export interface EmailLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EmailLog'];
        meta: {
            name: 'EmailLog';
        };
    };
    findUnique<T extends EmailLogFindUniqueArgs>(args: Prisma.SelectSubset<T, EmailLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EmailLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EmailLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EmailLogFindFirstArgs>(args?: Prisma.SelectSubset<T, EmailLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EmailLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EmailLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EmailLogFindManyArgs>(args?: Prisma.SelectSubset<T, EmailLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EmailLogCreateArgs>(args: Prisma.SelectSubset<T, EmailLogCreateArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EmailLogCreateManyArgs>(args?: Prisma.SelectSubset<T, EmailLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EmailLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EmailLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EmailLogDeleteArgs>(args: Prisma.SelectSubset<T, EmailLogDeleteArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EmailLogUpdateArgs>(args: Prisma.SelectSubset<T, EmailLogUpdateArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EmailLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, EmailLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EmailLogUpdateManyArgs>(args: Prisma.SelectSubset<T, EmailLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EmailLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EmailLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EmailLogUpsertArgs>(args: Prisma.SelectSubset<T, EmailLogUpsertArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EmailLogCountArgs>(args?: Prisma.Subset<T, EmailLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EmailLogCountAggregateOutputType> : number>;
    aggregate<T extends EmailLogAggregateArgs>(args: Prisma.Subset<T, EmailLogAggregateArgs>): Prisma.PrismaPromise<GetEmailLogAggregateType<T>>;
    groupBy<T extends EmailLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EmailLogGroupByArgs['orderBy'];
    } : {
        orderBy?: EmailLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EmailLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EmailLogFieldRefs;
}
export interface Prisma__EmailLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.EmailLog$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmailLog$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EmailLogFieldRefs {
    readonly id: Prisma.FieldRef<"EmailLog", 'String'>;
    readonly userId: Prisma.FieldRef<"EmailLog", 'String'>;
    readonly type: Prisma.FieldRef<"EmailLog", 'EmailType'>;
    readonly status: Prisma.FieldRef<"EmailLog", 'EmailStatus'>;
    readonly toEmail: Prisma.FieldRef<"EmailLog", 'String'>;
    readonly fromEmail: Prisma.FieldRef<"EmailLog", 'String'>;
    readonly subject: Prisma.FieldRef<"EmailLog", 'String'>;
    readonly bodyPreview: Prisma.FieldRef<"EmailLog", 'String'>;
    readonly messageId: Prisma.FieldRef<"EmailLog", 'String'>;
    readonly error: Prisma.FieldRef<"EmailLog", 'String'>;
    readonly sentAt: Prisma.FieldRef<"EmailLog", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"EmailLog", 'DateTime'>;
}
export type EmailLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    where: Prisma.EmailLogWhereUniqueInput;
};
export type EmailLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    where: Prisma.EmailLogWhereUniqueInput;
};
export type EmailLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    where?: Prisma.EmailLogWhereInput;
    orderBy?: Prisma.EmailLogOrderByWithRelationInput | Prisma.EmailLogOrderByWithRelationInput[];
    cursor?: Prisma.EmailLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailLogScalarFieldEnum | Prisma.EmailLogScalarFieldEnum[];
};
export type EmailLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    where?: Prisma.EmailLogWhereInput;
    orderBy?: Prisma.EmailLogOrderByWithRelationInput | Prisma.EmailLogOrderByWithRelationInput[];
    cursor?: Prisma.EmailLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailLogScalarFieldEnum | Prisma.EmailLogScalarFieldEnum[];
};
export type EmailLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    where?: Prisma.EmailLogWhereInput;
    orderBy?: Prisma.EmailLogOrderByWithRelationInput | Prisma.EmailLogOrderByWithRelationInput[];
    cursor?: Prisma.EmailLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailLogScalarFieldEnum | Prisma.EmailLogScalarFieldEnum[];
};
export type EmailLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailLogCreateInput, Prisma.EmailLogUncheckedCreateInput>;
};
export type EmailLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EmailLogCreateManyInput | Prisma.EmailLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EmailLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    data: Prisma.EmailLogCreateManyInput | Prisma.EmailLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.EmailLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type EmailLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailLogUpdateInput, Prisma.EmailLogUncheckedUpdateInput>;
    where: Prisma.EmailLogWhereUniqueInput;
};
export type EmailLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EmailLogUpdateManyMutationInput, Prisma.EmailLogUncheckedUpdateManyInput>;
    where?: Prisma.EmailLogWhereInput;
    limit?: number;
};
export type EmailLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailLogUpdateManyMutationInput, Prisma.EmailLogUncheckedUpdateManyInput>;
    where?: Prisma.EmailLogWhereInput;
    limit?: number;
    include?: Prisma.EmailLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type EmailLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    where: Prisma.EmailLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmailLogCreateInput, Prisma.EmailLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EmailLogUpdateInput, Prisma.EmailLogUncheckedUpdateInput>;
};
export type EmailLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    where: Prisma.EmailLogWhereUniqueInput;
};
export type EmailLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailLogWhereInput;
    limit?: number;
};
export type EmailLog$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type EmailLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
};
