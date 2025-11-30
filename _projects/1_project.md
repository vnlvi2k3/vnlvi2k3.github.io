---
layout: page
title: Semi-MoE
description: Mixture-of-Experts for Histopathology
img: assets/img/semi_moe.jpg
importance: 1
category: research
related_publications: true
---

<div class="row">
    <div class="col-sm-12">
        <p class="text-muted">
            <strong>Affiliation:</strong> <a href="https://xulabs.github.io/">Xu Lab, Carnegie Mellon University</a> &nbsp;|&nbsp;
            <strong>Advisor:</strong> <a href="https://xulabs.github.io/min-xu/">Prof. Min Xu</a> &nbsp;|&nbsp;
            <strong>Venue:</strong> BMVC 2025
        </p>
    </div>
</div>

---

## The Challenge

Histopathology images suffer from severe domain shifts (scanner differences, staining protocols), causing standard semi-supervised models to fail due to the "homogeneity assumption." Conventional methods assume labeled and unlabeled data share the same distribution, but in real-world clinical settings, tissue samples exhibit significant variations across different laboratories, leading to unreliable pseudo-labels and degraded segmentation performance.

---

## The Method

We introduce a **Mixture-of-Experts (MoE)** framework. Unlike static models, our dynamic gating network assigns specific experts to handle different sub-domains of data. The framework consists of:

1. **Expert Network Pool**: Multiple parallel expert networks, each specializing in distinct data sub-domains
2. **Learnable Gating Mechanism**: A dynamic routing network that assigns inputs to the most appropriate expert
3. **Cross-Expert Consistency**: Regularization that encourages agreement between experts on unlabeled data

The final prediction is computed as a weighted combination of expert outputs, enabling robust handling of distribution heterogeneity.

{% include figure.liquid path="assets/img/semi_moe.jpg" title="Figure 1: The Semi-MoE Architecture handling domain shifts." class="img-fluid rounded z-depth-1" %}

---

## Key Innovation

**Diversity Loss to Prevent Mode Collapse**: We introduce an entropy-based load balancing loss that prevents all inputs from being routed to a single expert. This ensures that each expert learns to specialize in different aspects of the data distribution, maximizing the framework's ability to handle domain shifts.

---

## Results

Our method achieves **state-of-the-art performance** on multiple histopathology benchmarks, with particularly strong gains in cross-domain generalization scenarios. Semi-MoE demonstrates significant improvements over baseline methods, especially when labeled data is limited (5-10% of the dataset).

---

## Publication

This work was accepted at **BMVC 2025**. [Paper PDF](#) | [Code](#)
