import { CloudWatchEventsClient, PutEventsCommand } from "@aws-sdk/client-cloudwatch-events"
import opentelemetry from "@opentelemetry/api"
import { Service } from "typedi"

@Service()
export class ProjectService {
  async getOne(_id: string) {
    const client = new CloudWatchEventsClient({
      endpoint: process.env.OFFLINE_EVENT_BUS_ENDPOINT,
      region: process.env.REGION
    })
    const span = opentelemetry.trace.getSpan(opentelemetry.context.active())
    span.addEvent("James send event in project service layer")

    const traceId = span.spanContext().traceId
    const spanId = span.spanContext().spanId
    const isRemote = span.spanContext().isRemote || true
    const traceFlags = span.spanContext().traceFlags

    const input = {
      Entries: [
        {
          EventBusName: process.env.OFFLINE_EVENT_BUS_NAME,
          Source: process.env.OFFLINE_EVENT_SOURCE,
          DetailType: "SAMPLE_EVENT",
          Detail: JSON.stringify({ name: "hello world", otel: { traceId, spanId, isRemote, traceFlags } })
        }
      ]
    }
    const command = new PutEventsCommand(input)
    await client.send(command)
    return true
  }
}
