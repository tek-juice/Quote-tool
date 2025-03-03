import { ReactElement } from "react";

export interface Content {
  title?: "landing" | "new build confirmation" | "purchase estimate 1" | "purchase estimate 2" | "purchase estimate 3" ;
  body?: ReactElement;
}