"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CartesianGrid, XAxis, Line, LineChart, YAxis } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"

export default function Component() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Total Sales</CardTitle>
              <CardDescription>A chart showing the total sales for the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
              <LinechartChart className="aspect-[9/4]" />
            </CardContent>
          </Card>
        </main>
  )
}


function LinechartChart(props: any) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--primary))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
            stroke="hsl(var(--foreground))"
          />
          <YAxis stroke="hsl(var(--foreground))" />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}