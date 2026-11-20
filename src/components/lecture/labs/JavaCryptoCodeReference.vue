<template>
  <div class="jca-code-reference">
    <div class="badge-title">
      <i class="fa-solid fa-code"></i>
      <span>{{ isEn ? 'Python Security & Cryptography Reference' : 'مرجع الأكواد الأكاديمية المبسطة (Python Security & Crypto Reference)' }}</span>
    </div>
    <h2 class="section-title">
      {{ isEn ? 'Industrial Cryptography Standards Implementation in Python' : 'التطبيق البرمجي السهل لمعايير التشفير الصناعية بلغة Python' }}
    </h2>
    <p class="lead">
      {{ isEn ? 'Clean, easy-to-follow Python examples using the standard hashlib library and the official cryptography package following NIST guidelines:' : 'أكواد نموذجية سهلة ومختصرة لطلبة السنة الثالثة باستخدام مكتبتي hashlib و cryptography في لغة Python، متوافقة مع إرشادات الأمن السيبراني (NIST):' }}
    </p>

    <!-- Code 1: AES-256 GCM -->
    <div class="code-card">
      <div class="code-header">
        <h3 class="code-title">
          <i class="fa-solid fa-lock"></i>
          <span>{{ isEn ? '1. Symmetric Encryption: AES-256 in GCM Authenticated Mode' : '1. التشفير المتماثل: AES-256 بوضع GCM المعتمد للمصادقة' }}</span>
        </h3>
        <span class="pill-badge">NIST Recommended / AEAD</span>
      </div>
      <p class="code-desc">
        {{ isEn ? 'GCM mode provides confidentiality alongside cryptographic data integrity (AEAD) against active tampering:' : 'يوفر وضع GCM التشفير والسرية مع مصادقة سلامة البيانات (Integrity) في آنٍ واحد بأسطر قليلة وواضحة:' }}
      </p>
      <CodeViewer :lines="aesGcmCode" :active-line="-1" lang-label="Python" />
    </div>

    <!-- Code 2: RSA-2048 Asymmetric -->
    <div class="code-card">
      <div class="code-header">
        <h3 class="code-title">
          <i class="fa-solid fa-key"></i>
          <span>{{ isEn ? '2. Asymmetric Cryptography: RSA-2048 Key Pair Generation' : '2. التشفير غير المتماثل: توليد مفاتيح RSA-2048' }}</span>
        </h3>
        <span class="pill-badge">Asymmetric / RSA-2048</span>
      </div>
      <p class="code-desc">
        {{ isEn ? 'Generates a secure 2048-bit RSA public/private keypair in just a few simple lines of Python:' : 'توليد زوج المفاتيح (العام للتشفير والخاص لفك التشفير) بسهولة تامة في Python:' }}
      </p>
      <CodeViewer :lines="rsaCode" :active-line="-1" lang-label="Python" />
    </div>

    <!-- Code 3: Complete Main Program -->
    <div class="code-card">
      <div class="code-header">
        <h3 class="code-title">
          <i class="fa-solid fa-star" style="color:var(--accent, #d97706);"></i>
          <span>{{ isEn ? '3. Comprehensive Main Program (main_crypto.py)' : '3. برنامج تطبيقي متكامل ومبسط يدمج الهاش والتشفير (main_crypto.py)' }}</span>
        </h3>
        <span class="pill-badge">Complete Demo</span>
      </div>
      <CodeViewer :lines="mainProgramCode" :active-line="-1" lang-label="Python" />
    </div>
  </div>
</template>

<script setup>
import CodeViewer from '@/components/lecture/layout/CodeViewer.vue'

defineProps({
  isEn: { type: Boolean, default: false }
})

const aesGcmCode = [
  'import os',
  'from cryptography.hazmat.primitives.ciphers.aead import AESGCM',
  '',
  'def encrypt_aes(message, key):',
  '    nonce = os.urandom(12)  # قيمة عشوائية 12 بايت (96 بت)',
  '    aes = AESGCM(key)',
  '    ciphertext = aes.encrypt(nonce, message, None)',
  '    return nonce, ciphertext',
  '',
  '# مثال سريع للتشغيل:',
  'key = AESGCM.generate_key(bit_length=256)  # مفتاح 256 بت',
  'nonce, encrypted = encrypt_aes(b"Hello Cyber", key)'
]

const rsaCode = [
  'from cryptography.hazmat.primitives.asymmetric import rsa',
  '',
  'def generate_rsa_keys():',
  '    private_key = rsa.generate_private_key(',
  '        public_exponent=65537,',
  '        key_size=2048  # مفتاح بطول 2048 بت آمن حالياً',
  '    )',
  '    public_key = private_key.public_key()',
  '    return private_key, public_key'
]

const mainProgramCode = [
  '# مختبر الأمن السيبراني والتشفير العملي (سنة ثالثة علوم حاسوب)',
  '# إعداد وتطوير: م. عبدالحميد هلال دعبان - العام الجامعي 2026-2027م',
  'import os',
  'import hashlib',
  'from cryptography.hazmat.primitives.ciphers.aead import AESGCM',
  '',
  'print("=== نظام التشفير والأمن السيبراني بلغة Python ===")',
  'message = "CyberSecurity-3rdYear-CS-2027".encode()',
  '',
  '# 1. حساب بصمة الهاش SHA-256 لضمان السلامة (Integrity)',
  'digest = hashlib.sha256(message).hexdigest()',
  'print("الرسالة الأصلية:", message.decode())',
  'print("بصمة الهاش (SHA-256):", digest)',
  '',
  '# 2. التشفير المتماثل AES-256-GCM لضمان السرية والمصادقة',
  'key = AESGCM.generate_key(bit_length=256)',
  'nonce = os.urandom(12)',
  'ciphertext = AESGCM(key).encrypt(nonce, message, None)',
  'print("تم التشفير بنجاح (Hex):", ciphertext.hex()[:32] + "...")'
]
</script>

<style scoped>
.jca-code-reference {
  margin: 10px 0;
}
.badge-title {
  font-size: 13px;
  color: var(--brand, #059669);
  font-weight: 800;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.section-title {
  font-size: 22px;
  font-weight: 900;
  color: var(--ink, #0f172a);
  margin: 0 0 12px;
}
.lead {
  color: var(--muted, #64748b);
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 24px;
  line-height: 1.85;
}
.code-card {
  margin-bottom: 30px;
  background: var(--bg, #f8fafc);
  border: 1px solid var(--line, #e2e8f0);
  border-radius: 16px;
  padding: 24px;
}
.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}
.code-title {
  margin: 0;
  color: var(--brand, #059669);
  font-size: 17px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
}
.pill-badge {
  font-size: 11.5px;
  font-weight: 800;
  background: var(--brand-soft, #ecfdf5);
  color: var(--brand, #059669);
  border-radius: 20px;
  padding: 3px 12px;
  font-family: var(--font-mono, monospace);
}
.code-desc {
  margin: 0 0 14px;
  font-size: 14px;
  color: var(--muted, #64748b);
  line-height: 1.7;
}
</style>
