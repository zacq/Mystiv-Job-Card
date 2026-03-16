import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import type { JobCardData } from '@/types/job-card'

// Register a standard font
Font.register({
  family: 'Helvetica',
  fonts: [],
})

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    padding: 36,
    backgroundColor: '#ffffff',
    color: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: '2px solid #1d4ed8',
  },
  workshopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  workshopSub: {
    fontSize: 9,
    color: '#6b7280',
    marginTop: 2,
  },
  jobCardLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#1d4ed8',
  },
  recordId: {
    fontSize: 8,
    color: '#9ca3af',
    textAlign: 'right',
    marginTop: 2,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#1d4ed8',
    padding: '4 8',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  field: {
    width: '48%',
    marginBottom: 4,
  },
  fieldFull: {
    width: '100%',
    marginBottom: 4,
  },
  label: {
    fontSize: 7.5,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 1,
  },
  value: {
    fontSize: 10,
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: 2,
    minHeight: 14,
  },
  priorityBadge: {
    fontSize: 9,
    fontWeight: 'bold',
    padding: '2 6',
    borderRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 36,
    right: 36,
    borderTop: '1px solid #e5e7eb',
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 7.5,
    color: '#9ca3af',
  },
  signatureRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  signatureBlock: {
    flex: 1,
    borderTop: '1px solid #111827',
    paddingTop: 4,
  },
  signatureLabel: {
    fontSize: 8,
    color: '#6b7280',
  },
})

function priorityColor(p: string) {
  const map: Record<string, string> = {
    Low: '#dcfce7',
    Medium: '#fef9c3',
    High: '#ffedd5',
    Urgent: '#fee2e2',
  }
  return map[p] ?? '#f3f4f6'
}

interface JobCardDocumentProps {
  data: JobCardData
  recordId: string
}

export function JobCardDocument({ data, recordId }: JobCardDocumentProps) {
  const now = new Date().toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <Document title={`Job Card — ${data.vehicleReg}`} author="Mystiv Workshop">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.workshopName}>Mystiv Workshop</Text>
            <Text style={styles.workshopSub}>Vehicle Service Job Card</Text>
          </View>
          <View>
            <Text style={styles.jobCardLabel}>JOB CARD</Text>
            <Text style={styles.recordId}>Ref: {recordId}</Text>
            <Text style={styles.recordId}>Issued: {now}</Text>
          </View>
        </View>

        {/* Client */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Details</Text>
          <View style={styles.grid}>
            <View style={styles.field}>
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>{data.clientName}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{data.clientPhone}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{data.clientEmail || '—'}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>{data.clientAddress || '—'}</Text>
            </View>
          </View>
        </View>

        {/* Vehicle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
          <View style={styles.grid}>
            <View style={styles.field}>
              <Text style={styles.label}>Make</Text>
              <Text style={styles.value}>{data.vehicleMake}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Model</Text>
              <Text style={styles.value}>{data.vehicleModel}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Year</Text>
              <Text style={styles.value}>{data.vehicleYear}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Registration</Text>
              <Text style={styles.value}>{data.vehicleReg}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Colour</Text>
              <Text style={styles.value}>{data.vehicleColour || '—'}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Mileage (km)</Text>
              <Text style={styles.value}>{data.vehicleMileage ?? '—'}</Text>
            </View>
            {data.vehicleVIN && (
              <View style={styles.fieldFull}>
                <Text style={styles.label}>VIN</Text>
                <Text style={styles.value}>{data.vehicleVIN}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Service */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Details</Text>
          <View style={styles.grid}>
            <View style={styles.fieldFull}>
              <Text style={styles.label}>Services Required</Text>
              <Text style={styles.value}>{data.services.join(' · ')}</Text>
            </View>
            <View style={styles.fieldFull}>
              <Text style={styles.label}>Job Description</Text>
              <Text style={styles.value}>{data.jobDescription}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Priority</Text>
              <Text
                style={[
                  styles.priorityBadge,
                  { backgroundColor: priorityColor(data.priority) },
                ]}
              >
                {data.priority}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Est. Completion</Text>
              <Text style={styles.value}>{data.estCompletionDate || '—'}</Text>
            </View>
            {data.notes && (
              <View style={styles.fieldFull}>
                <Text style={styles.label}>Additional Notes</Text>
                <Text style={styles.value}>{data.notes}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Advisor */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workshop</Text>
          <View style={styles.grid}>
            <View style={styles.field}>
              <Text style={styles.label}>Service Advisor</Text>
              <Text style={styles.value}>{data.advisorName}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Technician</Text>
              <Text style={styles.value}>{data.technicianName || '—'}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Bay</Text>
              <Text style={styles.value}>{data.bayNumber || '—'}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Status</Text>
              <Text style={styles.value}>Open</Text>
            </View>
          </View>
        </View>

        {/* Signatures */}
        <View style={styles.signatureRow}>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureLabel}>Client Signature</Text>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureLabel}>Advisor Signature</Text>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureLabel}>Date</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Mystiv Workshop · Job Card System</Text>
          <Text style={styles.footerText}>Ref: {recordId}</Text>
        </View>
      </Page>
    </Document>
  )
}
