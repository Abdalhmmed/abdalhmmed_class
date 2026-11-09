<template>
  <div class="table-container">
    <table class="summary-table">
      <thead>
        <tr>
          <th>{{ isEn ? 'Algorithm' : 'الخوارزمية' }}</th>
          <th>{{ isEn ? 'Type' : 'النوع' }}</th>
          <th>{{ isEn ? 'Key Size' : 'حجم المفتاح' }}</th>
          <th>{{ isEn ? 'Primary Security Goal' : 'الهدف الأمني الرئيسي' }}</th>
          <th>{{ isEn ? 'Vulnerabilities & Threats' : 'نقاط الضعف والهجمات' }}</th>
          <th>{{ isEn ? 'Current Status (2026-2027)' : 'الوضع الأمني في 2026-2027' }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in rows" :key="idx">
          <td><b>{{ isEn ? row.nameEn : row.name }}</b></td>
          <td>{{ isEn ? row.typeEn : row.type }}</td>
          <td><code class="mono-code">{{ isEn ? (row.keySizeEn || row.keySize) : row.keySize }}</code></td>
          <td>{{ isEn ? row.goalEn : row.goal }}</td>
          <td>{{ isEn ? row.flawEn : row.flaw }}</td>
          <td>
            <span class="status-pill" :class="row.statusClass">
              {{ isEn ? row.statusEn : row.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  isEn: { type: Boolean, default: false }
})

const rows = [
  {
    name: 'شفرة قيصر (Caesar)',
    nameEn: 'Caesar Cipher',
    type: 'إزاحة تاريخية',
    typeEn: 'Historical Shift',
    keySize: '1 - 25',
    goal: 'إخفاء بدائي للنصوص',
    goalEn: 'Basic obfuscation',
    flaw: 'التحليل التكراري والقوة الغاشمة (Brute-Force)',
    flawEn: 'Frequency analysis & trivial Brute-Force',
    status: 'مكسورة بالكامل / تعليمية',
    statusEn: 'Trivially Broken / Academic',
    statusClass: 'status-bad'
  },
  {
    name: 'لوحة المرة الواحدة (OTP/XOR)',
    nameEn: 'One-Time Pad (OTP)',
    type: 'تشفير تدفق (Stream)',
    typeEn: 'Stream Cipher',
    keySize: '= طول الرسالة',
    keySizeEn: '= Message Length',
    goal: 'سرية تامة رياضياً (Perfect Secrecy)',
    goalEn: 'Mathematical Perfect Secrecy',
    flaw: 'صعوبة تبادل المفاتيح العشوائية الضخمة بأمان',
    flawEn: 'Key distribution & reuse disasters',
    status: 'غير قابلة للكسر رياضياً إن طُبقت صح',
    statusEn: 'Unbreakable if keys are true random & single-use',
    statusClass: 'status-ok'
  },
  {
    name: 'معيار AES (Rijndael)',
    nameEn: 'AES Standard (Rijndael)',
    type: 'تشفير كتل (Block 128)',
    typeEn: 'Block Cipher (SPN)',
    keySize: '128 / 256 bit',
    goal: 'سرية البيانات الضخمة وسرعة المعالجة',
    goalEn: 'Bulk confidentiality & high throughput',
    flaw: 'هجمات القنوات الجانبية (Side-Channel) عند سوء التطبيق',
    flawEn: 'Side-channel timing attacks if improperly implemented',
    status: 'المعيار الذهبي العالمي المعتمد',
    statusEn: 'Global Gold Standard (NIST FIPS 197)',
    statusClass: 'status-ok'
  },
  {
    name: 'نظام RSA',
    nameEn: 'RSA Cryptosystem',
    type: 'تشفير غير متماثل (Asymmetric)',
    typeEn: 'Asymmetric (Public Key)',
    keySize: '2048 - 4096 bit',
    goal: 'تبادل المفاتيح والتوقيع الرقمي',
    goalEn: 'Key encapsulation & Digital Signatures',
    flaw: 'التحليل إلى عوامل أولية والحواسيب الكمومية (Shor)',
    flawEn: 'Integer factorization & Shor Quantum Algorithm',
    status: 'آمن حالياً (2048+) / يجري التحول للـ PQC',
    statusEn: 'Secure (2048+) / Transitioning to PQC',
    statusClass: 'status-warn'
  },
  {
    name: 'بروتوكول Diffie-Hellman',
    nameEn: 'Diffie-Hellman (DH/ECDH)',
    type: 'تبادل مفاتيح',
    typeEn: 'Key Exchange Protocol',
    keySize: '2048 bit / ECC 256',
    goal: 'الاتفاق على مفتاح سري عبر وسيط عام غير آمن',
    goalEn: 'Ephemeral shared secret negotiation',
    flaw: 'هجوم رجل في المنتصف (Man-in-the-Middle) بدون توقيع',
    flawEn: 'Man-in-the-Middle (MitM) if unauthenticated',
    status: 'أساس بروتوكول TLS 1.3 والـ HTTPS',
    statusEn: 'Core backbone of TLS 1.3 & HTTPS',
    statusClass: 'status-ok'
  },
  {
    name: 'دوال الهاش (SHA-256)',
    nameEn: 'Cryptographic Hash (SHA-256)',
    type: 'دالة اتجاه واحد (Hash)',
    typeEn: 'One-Way Hash Function',
    keySize: 'بصمة 256 بت',
    keySizeEn: '256-bit Digest',
    goal: 'سلامة البيانات (Integrity) وعدم التلاعب',
    goalEn: 'Data integrity & avalanche detection',
    flaw: 'هجمات التصادم (Collision) وهجمات أعياد الميلاد',
    flawEn: 'Theoretical collision & birthday attacks',
    status: 'معيار الصناعة العالمي والبلوكشين',
    statusEn: 'Universal Standard & Blockchain Proof-of-Work',
    statusClass: 'status-ok'
  },
  {
    name: 'التوقيع الرقمي (ECDSA / Ed25519)',
    nameEn: 'Digital Signatures (ECDSA / Ed25519)',
    type: 'عدم الإنكار والمصادقة (Signature)',
    typeEn: 'Non-Repudiation & Authentication',
    keySize: 'ECC 256 / RSA 2048+',
    keySizeEn: 'ECC 256 / RSA 2048+',
    goal: 'إثبات الهوية، سلامة الرسالة، وعدم الإنكار',
    goalEn: 'Authentication, integrity, non-repudiation',
    flaw: 'سرقة المفتاح الخاص أو تكرار قيمة nonce العشوائية',
    flawEn: 'Private key exfiltration & nonce reuse vulnerabilities',
    status: 'العمود الفقري لشهادات SSL/TLS وتوثيق الهوية',
    statusEn: 'Pillar of PKI certificates, SSH & Code Signing',
    statusClass: 'status-ok'
  }
]
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  border: 1px solid var(--line, #e2e8f0);
  border-radius: var(--radius-lg, 16px);
  margin: 20px 0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.02);
}
.summary-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  background: var(--paper, #fff);
}
.summary-table th,
.summary-table td {
  padding: 14px 18px;
  border-bottom: 1px solid var(--line, #e2e8f0);
  text-align: right;
  line-height: 1.6;
}
:global(html[dir="ltr"]) .summary-table th,
:global(html[dir="ltr"]) .summary-table td {
  text-align: left;
}
.summary-table th {
  background: var(--brand-soft, #ecfdf5);
  color: var(--ink, #0f172a);
  font-weight: 800;
  white-space: nowrap;
}
.summary-table tr:last-child td {
  border-bottom: none;
}
.mono-code {
  font-family: var(--font-mono, monospace);
  font-size: 12.5px;
  background: var(--bg, #f8fafc);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--line, #e2e8f0);
}
.status-pill {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
}
.status-ok {
  background: #dcfce7;
  color: #15803d;
}
.status-bad {
  background: #fee2e2;
  color: #b91c1c;
}
.status-warn {
  background: #fef3c7;
  color: #b45309;
}
:global([data-theme="dark"]) .status-ok {
  background: rgba(16, 185, 129, 0.2);
  color: #86efac;
}
:global([data-theme="dark"]) .status-bad {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}
:global([data-theme="dark"]) .status-warn {
  background: rgba(245, 158, 11, 0.2);
  color: #fde047;
}
</style>
