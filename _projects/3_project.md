---
layout: page
title: SemiSAM
description: Foundation Models meet Medical AI
img: assets/img/semisam.jpg
importance: 2
category: research
---

<div class="row">
    <div class="col-sm-12">
        <p class="text-muted">
            <strong>Role:</strong> <span class="badge bg-primary">Project Lead</span> &nbsp;|&nbsp;
            <strong>Affiliation:</strong> <a href="https://xulabs.github.io/">Xu Lab, Carnegie Mellon University</a> &nbsp;|&nbsp;
            <strong>Advisor:</strong> <a href="https://xulabs.github.io/min-xu/">Prof. Min Xu</a>
        </p>
    </div>
</div>

---

## The Challenge

The Segment Anything Model (SAM) is powerful but lacks specific medical knowledge and requires prompts. Medical images (histopathology, CT, MRI, ultrasound) have fundamentally different characteristics from natural images, and SAM's prompt-based interface requires expert guidance for every prediction, making it impractical for clinical deployment. The naive solution—fine-tuning SAM on medical data—risks catastrophic forgetting of the rich generalizable representations that make SAM powerful in the first place.

---

## The Method

I designed a **Co-training framework** that distills the "generalist" knowledge of SAM into a "specialist" medical segmentation network (UNet/TransUNet) using unlabeled data. The framework operates through:

1. **SAM Branch (Teacher)**: The frozen SAM model processes unlabeled medical images using automatically generated prompts, providing pseudo-labels for the student network
2. **Student Branch**: A lightweight medical segmentation network learns from both labeled data and SAM's pseudo-labels
3. **Bidirectional Knowledge Transfer**: Consistency regularization ensures the student network learns robust features while preserving SAM's generalization capabilities

{% include figure.liquid path="assets/img/semisam.jpg" title="Figure 2: Co-training pipeline between SAM and student network." class="img-fluid rounded z-depth-1" %}

---

## Key Innovation

**Consistency Regularization Strategy**: A consistency regularization strategy that allows the student network to learn from SAM's robust features without needing heavy manual prompts during inference. The trained student network requires **no prompts at inference time**, enabling fully automatic segmentation while maintaining SAM's powerful generalization capabilities.

---

## Impact

SemiSAM exemplifies my research philosophy of **foundation-model-driven design**—leveraging foundation models' complementary strengths through principled co-training rather than treating them as black boxes to fine-tune. This approach preserves SAM's generalization, enables efficient deployment, and maximizes the use of abundant unannotated medical images.

---

## Current Status

This is an **ongoing project** where I serve as the **lead researcher**, coordinating the experimental design, implementation, and manuscript preparation.
