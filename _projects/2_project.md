---
layout: page
title: Disentangling Stain & Structure in Histopathology
description: Learning Robust Representations for Histopathology under Staining Variability
img: assets/img/disentangle_arch.jpg
importance: 2
category: research
related_publications: true
---

<div class="row">
    <div class="col-sm-12">
        <p class="text-muted">
            <strong>Affiliation:</strong> <a href="https://www.mhilab.org/">Machine and Hybrid Intelligence Lab, Northwestern University</a> &nbsp;|&nbsp;
            <strong>Advisor:</strong> <a href="https://www.mhilab.org/">Prof. Ulas Bagci</a> &nbsp;|&nbsp;
            <strong>Venue:</strong> MICCAI Workshop on Computational Pathology (COMPAYL) 2025
        </p>
    </div>
</div>

---

## The Challenge

H&E (Hematoxylin & Eosin) stained histopathology images exhibit significant color variability (stain heterogeneity) across different laboratories, causing standard segmentation models to fail. This domain shift arises from variations in staining protocols, batch-to-batch differences, and scanner hardware variations. Conventional data augmentation techniques are insufficient to handle this fundamental distribution mismatch, leading to poor generalization when models trained on one dataset are deployed in different clinical settings—a critical limitation for real-world medical AI deployment.

---

## The Method

We developed a **Mean-Teacher Framework** designed to explicitly disentangle "stain appearance" (style) from "tissue structure" (content). The framework consists of:

1. **Dual-Branch Architecture**: Separate encoder pathways process stain appearance features and structural content features independently
2. **Student-Teacher Consistency**: The student network learns to ignore color variations while preserving structural features through consistency regularization with the teacher network
3. **Disentanglement Loss**: A novel loss function that explicitly enforces separation between style and content representations, ensuring that structural features remain invariant to stain variations

The key insight is that while staining appearance varies dramatically across laboratories, the underlying tissue morphology—the true diagnostic signal—remains constant. By learning structure-invariant representations, the model can generalize across different staining protocols without requiring retraining or domain adaptation.

{% include figure.liquid path="assets/img/disentangle_arch.jpg" title="Figure: The proposed Stain-Structure Disentanglement Framework." class="img-fluid rounded z-depth-1" %}

---

## Key Innovation

A novel disentanglement loss that forces the model to learn **structure-invariant representations**, enabling robust segmentation even with limited annotations. Unlike conventional domain adaptation methods that require labeled data from target domains, our approach learns to extract domain-agnostic structural features during training, making it particularly effective for scenarios with scarce annotations and diverse staining protocols.

---

## Impact/Results

Our method achieves robust segmentation performance across multiple histopathology datasets with varying staining protocols, demonstrating significant improvements in cross-domain generalization compared to baseline methods. The disentanglement framework enables:

- **Generalization** across different staining protocols without retraining or domain adaptation
- **Reduced annotation burden** for multi-center studies by learning from limited labeled examples
- **Robust performance** in real-world clinical settings where staining variability is the norm rather than the exception

---

## Publication

This work was accepted at the **MICCAI Workshop on Computational Pathology (COMPAYL) 2025**.
