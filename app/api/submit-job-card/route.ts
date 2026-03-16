import { NextRequest, NextResponse } from 'next/server'
import { JobCardSchema } from '@/lib/schema'
import { createJobCardRecord } from '@/lib/airtable'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Server-side re-validation with Zod
    const parsed = JobCardSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Validation failed', errors: parsed.error.flatten() },
        { status: 422 }
      )
    }

    const { recordId } = await createJobCardRecord(parsed.data)

    return NextResponse.json({ recordId }, { status: 201 })
  } catch (error) {
    console.error('[submit-job-card]', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
