import type { JobCardData } from './schema'
import { JOB_STATUS_DEFAULT } from './constants'

const BASE_URL = 'https://api.airtable.com/v0'

function getAirtableConfig() {
  const pat = process.env.AIRTABLE_PAT
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableId = process.env.AIRTABLE_TABLE_ID

  if (!pat || !baseId || !tableId) {
    throw new Error(
      'Missing Airtable environment variables. Check AIRTABLE_PAT, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID in .env.local'
    )
  }
  return { pat, baseId, tableId }
}

export async function createJobCardRecord(
  data: JobCardData
): Promise<{ recordId: string }> {
  const { pat, baseId, tableId } = getAirtableConfig()

  const fields = {
    'Client Name': data.clientName,
    'Phone': data.clientPhone,
    'Email': data.clientEmail || '',
    'Address': data.clientAddress || '',
    'Make': data.vehicleMake,
    'Model': data.vehicleModel,
    'Year': data.vehicleYear,
    'Registration': data.vehicleReg,
    'VIN': data.vehicleVIN || '',
    'Colour': data.vehicleColour || '',
    'Mileage (km)': data.vehicleMileage ?? null,
    'Services': data.services.join(', '),
    'Job Description': data.jobDescription,
    'Priority': data.priority,
    'Est. Completion Date': data.estCompletionDate || '',
    'Notes': data.notes || '',
    'Advisor': data.advisorName,
    'Technician': data.technicianName || '',
    'Bay': data.bayNumber || '',
    'Status': JOB_STATUS_DEFAULT,
    'Date Received': new Date().toISOString(),
  }

  const response = await fetch(`${BASE_URL}/${baseId}/${encodeURIComponent(tableId)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${pat}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(
      `Airtable API error ${response.status}: ${JSON.stringify(error)}`
    )
  }

  const result = await response.json()
  return { recordId: result.id as string }
}

export async function getJobCardRecord(recordId: string): Promise<{
  id: string
  fields: Record<string, unknown>
}> {
  const { pat, baseId, tableId } = getAirtableConfig()

  const response = await fetch(
    `${BASE_URL}/${baseId}/${encodeURIComponent(tableId)}/${recordId}`,
    {
      headers: { Authorization: `Bearer ${pat}` },
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch record ${recordId}: ${response.status}`)
  }

  return response.json()
}
