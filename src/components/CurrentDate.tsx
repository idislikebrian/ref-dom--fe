"use client";

function getDateDisplay(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit"
  }).format(date);
}

function getDateTimeValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function CurrentDate() {
  const now = new Date();

  return (
    <time dateTime={getDateTimeValue(now)} suppressHydrationWarning>
      {getDateDisplay(now)}
    </time>
  );
}
