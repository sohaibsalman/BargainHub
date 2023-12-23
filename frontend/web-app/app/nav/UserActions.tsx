'use client';

import React from "react";
import Link from "next/link";
import { Button } from "flowbite-react";

export default function UserActions() {
  return (
    <Button outline>
      <Link href="/session">Session</Link>
    </Button>
  );
}
