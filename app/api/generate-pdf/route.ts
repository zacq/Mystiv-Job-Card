import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer, DocumentProps } from '@react-pdf/renderer'
import { JobCardSchema } from '@/lib/schema'
import { JobCardDocument } from '@/components/pdf/JobCardDocument'
import React from 'react'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { recordId, data } = body as { recordId: string; data: unknown }

    if (!recordId) {
      return NextResponse.json({ message: 'recordId is required' }, { status: 400 })
    }

    const parsed = JobCardSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Invalid job card data', errors: parsed.error.flatten() },
        { status: 422 }
      )
    }

    const pdfBuffer = await renderToBuffer(
      React.createElement(
        JobCardDocument,
        { data: parsed.data, recordId }
      ) as React.ReactElement<DocumentProps>
    )

    const filename = `job-card-${parsed.data.vehicleReg.replace(/\s+/g, '-')}-${recordId}.pdf`

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(pdfBuffer.byteLength),
      },
    })
  } catch (error) {
    console.error('[generate-pdf]', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'PDF generation failed' },
      { status: 500 }
    )
  }
}
