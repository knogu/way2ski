// @generated by protoc-gen-connect-query v0.4.1 with parameter "target=ts"
// @generated from file way/v1/way.proto (package way.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { createQueryService } from "@bufbuild/connect-query";
import { MethodKind } from "@bufbuild/protobuf";
import { GetLinesRequest, GetLinesResponse } from "./way_pb";

export const typeName = "way.v1.WayService";

/**
 * @generated from rpc way.v1.WayService.GetLines
 */
export const service = {
    typeName: "way.v1.WayService",
    methods: {
      getLines: {
        name: "GetLines",
        kind: MethodKind.Unary,
        I: GetLinesRequest,
        O: GetLinesResponse,
      },
    }
  } as const;