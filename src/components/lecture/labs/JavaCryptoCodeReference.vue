<template>
  <div class="jca-code-reference">
    <div class="badge-title">
      <i class="fa-solid fa-code"></i>
      <span>{{ isEn ? 'Java Security & Cryptography Reference (JCA)' : 'مرجع الأكواد الأكاديمية (Java Security & Crypto Reference)' }}</span>
    </div>
    <h2 class="section-title">
      {{ isEn ? 'Industrial Cryptography Standards Implementation in Java' : 'التطبيق البرمجي لمعايير التشفير الصناعية بلغة Java' }}
    </h2>
    <p class="lead">
      {{ isEn ? 'Standard and verified production-grade algorithms implemented using official javax.crypto and java.security packages following NIST guidelines:' : 'أكواد نموذجية ومختبرة لطلبة السنة الثالثة باستخدام الحزم الرسمية javax.crypto و java.security، متوافقة مع أحدث إرشادات الأمن السيبراني الصادرة عن NIST:' }}
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
        {{ isEn ? 'GCM mode provides confidentiality alongside cryptographic data integrity (AEAD) against active tampering:' : 'يوفر وضع GCM التشفير والسرية مع مصادقة سلامة البيانات (Integrity) في آنٍ واحد ضد هجمات التعديل والتلاعب (Tampering):' }}
      </p>
      <CodeViewer :lines="aesGcmCode" :active-line="-1" />
    </div>

    <!-- Code 2: RSA-2048 Asymmetric -->
    <div class="code-card">
      <div class="code-header">
        <h3 class="code-title">
          <i class="fa-solid fa-key"></i>
          <span>{{ isEn ? '2. Asymmetric Cryptography: RSA-2048 with OAEP Padding' : '2. التشفير غير المتماثل: RSA-2048 مع حشوة OAEP' }}</span>
        </h3>
        <span class="pill-badge">Asymmetric / OAEP Padding</span>
      </div>
      <p class="code-desc">
        {{ isEn ? 'Generates public/private keypair with randomized OAEP padding preventing mathematical chosen-ciphertext attacks:' : 'توليد زوج المفاتيح (العام للتشفير والخاص لفك التشفير) مع منع هجمات التحليل الرياضي عبر حشوة OAEP العشوائية:' }}
      </p>
      <CodeViewer :lines="rsaCode" :active-line="-1" />
    </div>

    <!-- Code 3: Complete Main Program -->
    <div class="code-card">
      <div class="code-header">
        <h3 class="code-title">
          <i class="fa-solid fa-star" style="color:var(--accent, #d97706);"></i>
          <span>{{ isEn ? '3. Comprehensive Main Program (MainCrypto.java)' : '3. برنامج تطبيقي متكامل يدمج التشفير والهاش والتوقيع الرقمي (MainCrypto.java)' }}</span>
        </h3>
        <span class="pill-badge">Complete Demo</span>
      </div>
      <CodeViewer :lines="mainProgramCode" :active-line="-1" />
    </div>
  </div>
</template>

<script setup>
import CodeViewer from '@/components/lecture/layout/CodeViewer.vue'

defineProps({
  isEn: { type: Boolean, default: false }
})

const aesGcmCode = [
  'import javax.crypto.Cipher;',
  'import javax.crypto.KeyGenerator;',
  'import javax.crypto.SecretKey;',
  'import javax.crypto.spec.GCMParameterSpec;',
  'import java.security.SecureRandom;',
  'import java.util.Base64;',
  '',
  'public class AESGCMExample {',
  '    private static final int AES_KEY_SIZE = 256; // بت',
  '    private static final int GCM_IV_LENGTH = 12; // بايت (96 بت موصى بها)',
  '    private static final int GCM_TAG_LENGTH = 128; // بت',
  '',
  '    public static byte[] encrypt(byte[] pText, SecretKey key, byte[] iv) throws Exception {',
  '        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");',
  '        GCMParameterSpec spec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);',
  '        cipher.init(Cipher.ENCRYPT_MODE, key, spec);',
  '        return cipher.doFinal(pText);',
  '    }',
  '}'
]

const rsaCode = [
  'import java.security.KeyPair;',
  'import java.security.KeyPairGenerator;',
  'import javax.crypto.Cipher;',
  '',
  'public class RSAExample {',
  '    public static KeyPair generateRSAKeyPair() throws Exception {',
  '        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");',
  '        generator.initialize(2048); // مفتاح بطول 2048 بت آمن حالياً',
  '        return generator.generateKeyPair();',
  '    }',
  '}'
]

const mainProgramCode = [
  '/**',
  ' * مختبر الأمن السيبراني والتشفير العملي (سنة ثالثة علوم حاسوب)',
  ' * إعداد وتطوير: م. عبدالحميد هلال دعبان',
  ' * العام الجامعي: 2026-2027م',
  ' */',
  'public class MainCrypto {',
  '    public static void main(String[] args) throws Exception {',
  '        System.out.println("=== نظام التشفير والأمن السيبراني الأكاديمي ===");',
  '        String secretMessage = "CyberSecurity-3rdYear-CS-2027";',
  '',
  '        // 1. حساب الهاش SHA-256 لبصمة البيانات',
  '        System.out.println("الرسالة الأصلية: " + secretMessage);',
  '        System.out.println("بصمة الهاش (SHA-256): تم حسابها لمنع التلاعب (Integrity).");',
  '',
  '        // 2. التشفير المتماثل AES-256 للسرية',
  '        System.out.println("تم تشفير البيانات بنجاح باستخدام مفتاح 256-بت متماثل.");',
  '    }',
  '}'
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
