import React, { useEffect, useState } from 'react';
import { ArrowLeft, Camera, CheckCircle2, Info, ScanLine } from 'lucide-react';

export default function ARScanner({ onClose }) {
  const [markerVisible, setMarkerVisible] = useState(false);
  const [scanDone, setScanDone] = useState(false);

  useEffect(() => {
    // AR.js emits markerFound / markerLost on the a-marker element.
    const marker = document.querySelector('#inventory-marker');
    if (!marker) return;

    const onFound = () => setMarkerVisible(true);
    const onLost = () => setMarkerVisible(false);
    marker.addEventListener('markerFound', onFound);
    marker.addEventListener('markerLost', onLost);

    return () => {
      marker.removeEventListener('markerFound', onFound);
      marker.removeEventListener('markerLost', onLost);
    };
  }, []);

  return (
    <div style={{ color: '#203252' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.1, color: '#5276bd' }}>AUGMENTED REALITY</div>
          <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>Inventory Scanner · Nusantara Mart</div>
          <div style={{ color: '#71819b', fontSize: 13, marginTop: 4 }}>Arahkan kamera ke marker Hiro untuk memunculkan objek inventaris 3D.</div>
        </div>
        <button onClick={onClose} className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16}/> Tutup AR
        </button>
      </div>

      <div style={{ position: 'relative', width: '100%', height: 'min(62vh, 560px)', minHeight: 320, overflow: 'hidden', borderRadius: 16, background: '#101827' }}>
        <a-scene
          embedded
          vr-mode-ui="enabled: false"
          renderer="logarithmicDepthBuffer: true; colorManagement: true; alpha: true; antialias: true"
          arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono; matrixCodeType: 3x3"
          style={{ width: '100%', height: '100%' }}
        >
          <a-marker id="inventory-marker" preset="hiro" smooth="true" smoothCount="5" smoothTolerance="0.01" smoothThreshold="2">
            <a-entity position="0 0 0">
              <a-box position="0 0.55 0" width="0.8" height="0.9" depth="0.65" color="#c98b52" roughness="0.9">
                <a-text value="NUSANTARA MART" align="center" color="#ffffff" width="2.2" position="0 0.1 0.331" rotation="0 0 0"></a-text>
              </a-box>
              <a-box position="0 1.08 0" width="0.82" height="0.035" depth="0.67" color="#8b5b35"></a-box>
              <a-cylinder position="0 0.08 0" radius="0.48" height="0.12" color="#315fb9"></a-cylinder>
              <a-text value="INVENTORY ITEM" align="center" color="#1f345b" width="3" position="0 1.35 0" rotation="-90 0 0"></a-text>
              <a-plane position="0 1.7 0" rotation="-90 0 0" width="1.7" height="0.75" color="#ffffff" opacity="0.95"></a-plane>
              <a-text value="STOK SISTEM: 50 UNIT" align="center" color="#1f345b" width="2.4" position="0 1.72 0" rotation="-90 0 0"></a-text>
            </a-entity>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>

        <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 10, pointerEvents: 'none' }}>
          <div style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(12,24,43,.78)', color: '#fff', fontSize: 12 }}>
            <div style={{ fontWeight: 800, marginBottom: 3 }}>{markerVisible ? 'Marker terdeteksi' : 'Menunggu marker Hiro'}</div>
            <div style={{ opacity: .8 }}>{markerVisible ? 'Objek 3D inventaris sedang ditampilkan.' : 'Letakkan marker Hiro di depan kamera.'}</div>
          </div>
          <div style={{ padding: '9px 11px', borderRadius: 12, background: 'rgba(12,24,43,.78)', color: '#fff', fontSize: 11 }}>
            <Camera size={15} style={{ verticalAlign: 'middle', marginRight: 6 }}/> Kamera aktif saat diizinkan
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginTop: 14 }}>
        <div style={{ background: '#f4f7fc', borderRadius: 12, padding: 12 }}>
          <div style={{ color: '#71819b', fontSize: 11, fontWeight: 700 }}>STOK SISTEM</div>
          <strong style={{ fontSize: 22 }}>50 <small style={{ fontSize: 12 }}>unit</small></strong>
        </div>
        <div style={{ background: '#f4f7fc', borderRadius: 12, padding: 12 }}>
          <div style={{ color: '#71819b', fontSize: 11, fontWeight: 700 }}>STOK FISIK</div>
          <strong style={{ fontSize: 22 }}>35 <small style={{ fontSize: 12 }}>unit</small></strong>
        </div>
        <div style={{ background: '#fff5eb', borderRadius: 12, padding: 12 }}>
          <div style={{ color: '#bd6c22', fontSize: 11, fontWeight: 700 }}>SELISIH</div>
          <strong style={{ color: '#bd6c22', fontSize: 22 }}>15 <small style={{ fontSize: 12 }}>unit</small></strong>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginTop: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#71819b', fontSize: 12 }}>
          <Info size={15}/> Gunakan marker Hiro yang dicetak atau tampilkan dari perangkat lain.
        </div>
        <button className="btn btn-primary" onClick={() => setScanDone(true)} disabled={!markerVisible} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, opacity: markerVisible ? 1 : .55 }}>
          <ScanLine size={16}/> Simulasikan pemeriksaan
        </button>
      </div>
      {scanDone && <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: '#edf8f1', color: '#236b42', display: 'flex', alignItems: 'center', gap: 9, fontSize: 13 }}>
        <CheckCircle2 size={18}/> Pemeriksaan AR dicatat. Selisih 15 unit perlu ditelusuri melalui riwayat barang masuk dan keluar.
      </div>}
    </div>
  );
}
